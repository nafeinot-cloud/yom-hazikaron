import { gregorianToHebrew, hebrewToGregorian, hebrewMonthName, isHebrewLeapYear } from '../src/lib/hebrewCalendar.js';

function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}: got ${JSON.stringify(actual)} expected ${JSON.stringify(expected)}`);
}

// Known anchor from hebcal.com: Wed, 2 September 2026 = 20 Elul 5786
const h1 = gregorianToHebrew(2026, 9, 2);
check('2026-09-02 -> Hebrew', h1, { year: 5786, month: 6, day: 20 });
console.log('  month name:', hebrewMonthName(h1.month, h1.year));

// Round-trip back
const g1 = hebrewToGregorian(5786, 6, 20);
check('20 Elul 5786 -> Gregorian', g1, { year: 2026, month: 9, day: 2 });

// A handful of other commonly-known dates to sanity-check
// Rosh Hashana 5786 (1 Tishrei 5786) should be Sept 22-23 2025 (well known)
const rh = hebrewToGregorian(5786, 7, 1);
console.log('1 Tishrei 5786 ->', rh, '(expect ~2025-09-22/23)');

// Leap year check: 5784 is a leap year (year 2 of 19-yr cycle... just print)
console.log('isHebrewLeapYear(5784)=', isHebrewLeapYear(5784), ' (expected true)');
console.log('isHebrewLeapYear(5785)=', isHebrewLeapYear(5785), ' (expected false)');
console.log('isHebrewLeapYear(5786)=', isHebrewLeapYear(5786), ' (expected false)');
console.log('isHebrewLeapYear(5787)=', isHebrewLeapYear(5787), ' (expected true)');

// Round trip a wide range of random-ish dates
let allOk = true;
for (let y = 2000; y < 2040; y++) {
  for (const [m, d] of [[1, 15], [6, 30], [12, 31]]) {
    const abs1 = gregorianToHebrew(y, m, d);
    const back = hebrewToGregorian(abs1.year, abs1.month, abs1.day);
    if (back.year !== y || back.month !== m || back.day !== d) {
      allOk = false;
      console.log('ROUND TRIP FAIL', y, m, d, '->', abs1, '->', back);
    }
  }
}
console.log(allOk ? 'All round-trips OK (2000-2039 sample)' : 'SOME ROUND TRIPS FAILED');
