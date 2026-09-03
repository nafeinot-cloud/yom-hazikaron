import { absToGregorian, hebrewMonthName, hebrewNumeral, nextYahrzeit } from './hebrewCalendar.js';
import { displayName, honorific, religiousName } from './person.js';

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
 * Builds an .ics file with a single all-day event for the person's next
 * upcoming yahrzeit (Gregorian date). Deliberately a single, non-repeating
 * occurrence: the Hebrew date's Gregorian equivalent shifts every year, so a
 * yearly-recurring calendar event would silently go wrong in later years.
 */
export function buildYahrzeitIcs(person, { fromAbs } = {}) {
  const abs = nextYahrzeit(person.hebrewMonth, person.hebrewDay, fromAbs);
  const name = displayName(person);
  const stamp = icsDateTimeStampUTC();

  const start = icsDate(absToGregorian(abs));
  const end = icsDate(absToGregorian(abs + 1));

  const hebrewDateText = `${hebrewNumeral(person.hebrewDay)} ב${hebrewMonthName(person.hebrewMonth, person.hebrewYear)}`;

  const descriptionLines = [
    `${religiousName(person)} ${honorific(person)}`,
    `תאריך פטירה עברי: ${hebrewDateText}`,
    person.burialPlace ? `מקום קבורה: ${person.burialPlace}` : null,
    '',
    'התאריך הלועזי משתנה משנה לשנה לפי הלוח העברי - יש לעדכן שוב בכל שנה.',
  ].filter(Boolean);

  const eventLines = [
    'BEGIN:VEVENT',
    `UID:yahrzeit-${person.id}-${start}@yom-hazikaron`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeIcsText(`יום הזכרון - ${name} ${honorific(person)}`)}`,
    `DESCRIPTION:${escapeIcsText(descriptionLines.join('\n'))}`,
  ];
  if (person.burialPlace) eventLines.push(`LOCATION:${escapeIcsText(person.burialPlace)}`);
  eventLines.push('END:VEVENT');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//יום הזכרון//HE',
    'CALSCALE:GREGORIAN',
    eventLines.join('\r\n'),
    'END:VCALENDAR',
  ].join('\r\n');
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
