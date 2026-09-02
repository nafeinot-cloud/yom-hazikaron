import { absToGregorian, nextYahrzeit } from './hebrewCalendar.js';

/** The next `count` Gregorian occurrences (as abs day numbers) of a yahrzeit. */
function nextOccurrences(hebrewMonth, hebrewDay, fromAbs, count) {
  const out = [];
  let cursor = fromAbs;
  for (let i = 0; i < count; i++) {
    const abs = nextYahrzeit(hebrewMonth, hebrewDay, cursor);
    out.push(abs);
    cursor = abs + 1;
  }
  return out;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function icsDate({ year, month, day }) {
  return `${year}${pad(month)}${pad(day)}`;
}

function icsDateTimeStampUTC() {
  const d = new Date();
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T` +
    `${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function escapeIcsText(text) {
  return String(text).replace(/[\\;,]/g, (c) => '\\' + c).replace(/\n/g, '\\n');
}

/**
 * Builds an .ics file (multiple all-day VEVENTs, one per upcoming Hebrew-
 * calendar yahrzeit occurrence) for a person, since the Gregorian date
 * shifts every year — a plain yearly RRULE would not track it correctly.
 */
export function buildYahrzeitIcs(person, { fromAbs, years = 7 } = {}) {
  const occurrences = nextOccurrences(person.hebrewMonth, person.hebrewDay, fromAbs, years);
  const name = person.displayName ?? person.firstName;
  const stamp = icsDateTimeStampUTC();

  const events = occurrences
    .map((abs, i) => {
      const g = absToGregorian(abs);
      const start = icsDate(g);
      const endAbs = absToGregorian(abs + 1);
      const end = icsDate(endAbs);
      return [
        'BEGIN:VEVENT',
        `UID:yahrzeit-${person.id}-${start}@yom-hazikaron`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${escapeIcsText(`יום הזכרון - ${name}`)}`,
        `DESCRIPTION:${escapeIcsText(`יום הזכרון השנתי (${i + 1} מתוך ${years} תזכורות שנוספו)`)}`,
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//יום הזכרון//HE', 'CALSCALE:GREGORIAN', events, 'END:VCALENDAR'].join(
    '\r\n'
  );
}

export function downloadIcs(filename, icsContent) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
