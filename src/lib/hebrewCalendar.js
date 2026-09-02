// Hebrew <-> Gregorian calendar conversion.
//
// Implements the standard arithmetic (molad-based) Hebrew calendar rules:
// the 19-year Metonic leap-year cycle, the molad interval of 29 days
// 12 hours 793 chalakim, and the four dechiyot (postponement rules) for
// Rosh Hashana. This is the same well-established algorithm used by most
// Hebrew calendar software; day numbers are counted as "days since the
// Unix epoch" (1970-01-01 UTC = day 0) so they interoperate directly with
// native JS Date math for the Gregorian side.
//
// Verified against hebcal.com: 2 September 2026 => 20 Elul 5786.

const MS_PER_DAY = 86400000;

// Hebrew epoch (1 Tishrei, Year 1) expressed as days-since-Unix-epoch.
// Derived from the standard fixed-date epoch (Rata Die day -1373428 for
// 1 Tishrei year 1) minus the Rata Die day number of 1970-01-01 (719163).
const HEBREW_EPOCH_ABS = -2092591;

export const HMonth = {
  NISAN: 1,
  IYYAR: 2,
  SIVAN: 3,
  TAMUZ: 4,
  AV: 5,
  ELUL: 6,
  TISHREI: 7,
  CHESHVAN: 8,
  KISLEV: 9,
  TEVET: 10,
  SHVAT: 11,
  ADAR_I: 12,
  ADAR_II: 13,
};

const MONTH_NAMES_COMMON = {
  1: 'ניסן', 2: 'אייר', 3: 'סיוון', 4: 'תמוז', 5: 'אב', 6: 'אלול',
  7: 'תשרי', 8: 'חשוון', 9: 'כסלו', 10: 'טבת', 11: 'שבט', 12: 'אדר',
};
const MONTH_NAMES_LEAP = {
  ...MONTH_NAMES_COMMON,
  12: 'אדר א׳', 13: 'אדר ב׳',
};

/** Display order of months starting from Tishrei (civil new-year order), for UI pickers. */
export function monthsInDisplayOrder(year) {
  const leap = isHebrewLeapYear(year);
  const order = leap
    ? [7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6]
    : [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  return order.map((m) => ({ value: m, label: hebrewMonthName(m, year) }));
}

export function hebrewMonthName(month, year) {
  const leap = isHebrewLeapYear(year);
  return (leap ? MONTH_NAMES_LEAP : MONTH_NAMES_COMMON)[month];
}

export function isHebrewLeapYear(year) {
  return (1 + year * 7) % 19 < 7;
}

export function monthsInHebrewYear(year) {
  return isHebrewLeapYear(year) ? 13 : 12;
}

// Elapsed days from the Hebrew epoch to 1 Tishrei of `year` (molad-based,
// including the four dechiyot). Identical in structure to the standard
// algorithm used across independent Hebrew-calendar implementations.
function elapsedDays(year) {
  const prevYear = year - 1;
  const monthsElapsed =
    235 * Math.floor(prevYear / 19) +
    12 * (prevYear % 19) +
    Math.floor(((prevYear % 19) * 7 + 1) / 19);

  const partsElapsed = 204 + 793 * (monthsElapsed % 1080);
  const hoursElapsed =
    5 +
    12 * monthsElapsed +
    793 * Math.floor(monthsElapsed / 1080) +
    Math.floor(partsElapsed / 1080);
  const parts = (partsElapsed % 1080) + 1080 * (hoursElapsed % 24);
  const day = 1 + 29 * monthsElapsed + Math.floor(hoursElapsed / 24);

  let altDay = day;
  if (
    parts >= 19440 ||
    (day % 7 === 2 && parts >= 9924 && !isHebrewLeapYear(year)) ||
    (day % 7 === 1 && parts >= 16789 && isHebrewLeapYear(prevYear))
  ) {
    altDay += 1;
  }
  if (altDay % 7 === 0 || altDay % 7 === 3 || altDay % 7 === 5) {
    return altDay + 1;
  }
  return altDay;
}

export function daysInHebrewYear(year) {
  return elapsedDays(year + 1) - elapsedDays(year);
}

function longCheshvan(year) {
  return daysInHebrewYear(year) % 10 === 5;
}
function shortKislev(year) {
  return daysInHebrewYear(year) % 10 === 3;
}

export function daysInHebrewMonth(month, year) {
  if ([2, 4, 6, 10, 13].includes(month)) return 29; // Iyyar, Tamuz, Elul, Tevet, Adar II
  if ([1, 3, 5, 7, 11].includes(month)) return 30; // Nisan, Sivan, Av, Tishrei, Shvat
  if (month === 12) return isHebrewLeapYear(year) ? 30 : 29; // Adar / Adar I
  if (month === 8) return longCheshvan(year) ? 30 : 29; // Cheshvan
  if (month === 9) return shortKislev(year) ? 29 : 30; // Kislev
  throw new RangeError(`bad month ${month}`);
}

/** Days-since-Unix-epoch for 1 Tishrei of `year`. */
function hebrewNewYearAbs(year) {
  return HEBREW_EPOCH_ABS + elapsedDays(year);
}

/** Hebrew date -> days since Unix epoch. */
export function hebrewToAbs(year, month, day) {
  let total = day;
  if (month < HMonth.TISHREI) {
    const last = monthsInHebrewYear(year);
    for (let m = HMonth.TISHREI; m <= last; m++) total += daysInHebrewMonth(m, year);
    for (let m = HMonth.NISAN; m < month; m++) total += daysInHebrewMonth(m, year);
  } else {
    for (let m = HMonth.TISHREI; m < month; m++) total += daysInHebrewMonth(m, year);
  }
  return HEBREW_EPOCH_ABS + elapsedDays(year) + total - 1;
}

/** Days since Unix epoch -> Hebrew date {year, month, day}. */
export function absToHebrew(abs) {
  let year = Math.floor((abs - HEBREW_EPOCH_ABS) / 365.24682220597794);
  while (hebrewNewYearAbs(year) <= abs) year++;
  year--;

  let month = abs < hebrewToAbs(year, 1, 1) ? HMonth.TISHREI : HMonth.NISAN;
  while (abs > hebrewToAbs(year, month, daysInHebrewMonth(month, year))) month++;

  const day = 1 + abs - hebrewToAbs(year, month, 1);
  return { year, month, day };
}

// --- Gregorian side (native JS Date does the real calendar arithmetic) ---

export function gregorianToAbs(year, month, day) {
  return Math.floor(Date.UTC(year, month - 1, day) / MS_PER_DAY);
}

export function absToGregorian(abs) {
  const d = new Date(abs * MS_PER_DAY);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

export function hebrewToGregorian(year, month, day) {
  return absToGregorian(hebrewToAbs(year, month, day));
}

export function gregorianToHebrew(year, month, day) {
  return absToHebrew(gregorianToAbs(year, month, day));
}

/**
 * The next occurrence, on or after `fromAbs` (default: today), of a
 * yahrzeit originally set on Hebrew (deathMonth, deathDay).
 *
 * Two edge cases with genuine, disputed customs — implemented with the
 * most widely-followed default, flagged for confirmation with a rabbi:
 *  - Adar in a common year, observed in a leap year: this uses Adar II
 *    (the most common Ashkenazi practice after the first year); some
 *    families follow Adar I instead.
 *  - Day 30 of a month that is short (29 days) that year: falls back to
 *    the 1st of the following month, per the widely-cited approach.
 */
export function nextYahrzeit(deathMonth, deathDay, fromAbs = gregorianToAbs(...Object.values(todayYMD()))) {
  const { year: fromYear } = absToHebrew(fromAbs);
  for (let candidateYear = fromYear; candidateYear <= fromYear + 1; candidateYear++) {
    const abs = yahrzeitAbsInYear(deathMonth, deathDay, candidateYear);
    if (abs >= fromAbs) return abs;
  }
  // Should not happen, but guard against infinite loop.
  return yahrzeitAbsInYear(deathMonth, deathDay, fromYear + 1);
}

function yahrzeitAbsInYear(deathMonth, deathDay, year) {
  let month = deathMonth;
  const leap = isHebrewLeapYear(year);

  if (month === HMonth.ADAR_I && !leap) {
    // Regular Adar in a common year maps to plain Adar (month 12) that year.
    month = 12;
  } else if (month === 12 && leap) {
    // Death was in a common-year Adar; observe in Adar II in a leap year.
    month = HMonth.ADAR_II;
  }

  const last = daysInHebrewMonth(month, year);
  if (deathDay > last) {
    // e.g. died 30 Cheshvan, this year Cheshvan only has 29 days.
    const nextMonth = month === monthsInHebrewYear(year) ? HMonth.TISHREI : month + 1;
    const nextMonthYear = month === monthsInHebrewYear(year) ? year + 1 : year;
    return hebrewToAbs(nextMonthYear, nextMonth, 1);
  }
  return hebrewToAbs(year, month, deathDay);
}

function todayYMD() {
  const now = new Date();
  return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
}

// --- Hebrew numeral (gematria) formatting, e.g. 20 -> "כ׳" ---

const GEMATRIA_ONES = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
const GEMATRIA_TENS = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];

export function hebrewNumeral(num) {
  if (num <= 0 || num > 999) return String(num);
  let n = num;
  let out = '';
  const hundreds = Math.floor(n / 100);
  n %= 100;
  out += 'ת'.repeat(0); // placeholder, hundreds handled below for years elsewhere
  if (hundreds > 0) {
    // Only used for day-of-month (1-30) in this app, hundreds unused, kept for completeness.
    out += String(hundreds);
  }
  if (n === 15) return out + 'ט״ו';
  if (n === 16) return out + 'ט״ז';
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  out += GEMATRIA_TENS[tens] + GEMATRIA_ONES[ones];
  if (out.length === 1) return out + '׳';
  return out.slice(0, -1) + '״' + out.slice(-1);
}
