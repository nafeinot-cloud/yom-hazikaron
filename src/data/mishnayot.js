// "Mishnayot by name" study list — the custom of learning, on the eve of
// or on the day of a yahrzeit, one Mishnah per letter of the deceased's
// first name (the Mishnah's opening word starts with that letter).
//
// Sourced from kadish.org.il/torah-learning (compared against a second,
// independent table on he.chabad.org — both agree on tractate/chapter for
// nearly every letter). Commentary text below is an ORIGINAL plain-language
// paraphrase (not copied from any published commentary such as Kehati),
// written for this app.
//
// IMPORTANT: this content has not been reviewed by a rabbi. Verify against
// a printed Mishnah / Sefaria before relying on it. Entries with
// `needsReview: true` had ambiguous or unverified source data.

export const MISHNAYOT_BY_LETTER = {
  'א': { tractate: 'בבא מציעא', chapter: 'ב', mishna: 1, firstWords: 'אֵלּוּ מְצִיאוֹת שֶׁלּוֹ',
    commentary: 'המשנה פותחת ומפרטת אילו מציאות מותר למוצא להשאיר לעצמו בלי להכריז עליהן, לעומת אבידה שיש בה סימן מזהה שחייבים להכריז ולהשיב לבעליה.' },
  'ב': { tractate: 'שבת', chapter: 'ה', mishna: 1, firstWords: 'בַּמֶּה בְּהֵמָה יוֹצְאָה',
    commentary: 'המשנה דנה באילו כלים או קישוטים מותר לבהמה לצאת בשבת, ובאילו אסור, מחשש שמא ייפול הדבר ויבוא הבעלים לטלטלו ברשות הרבים.' },
  'ג': { tractate: 'פאה', chapter: 'ה', mishna: null, firstWords: 'גָּדִישׁ',
    commentary: 'המשנה עוסקת בדין גדיש (ערימת תבואה) שנתערב בו עומר שִׁכְחָה של עני - כיצד קובעים למי שייכת התבואה.' },
  'ד': { tractate: 'סנהדרין', chapter: 'א', mishna: 1, firstWords: 'דִּינֵי מָמוֹנוֹת בִּשְׁלֹשָׁה',
    commentary: 'המשנה פותחת בהרכב בתי הדין הנדרש לסוגי דינים שונים - דיני ממונות נדונים בשלושה דיינים.' },
  'ה': { tractate: 'ברכות', chapter: 'ט', mishna: 1, firstWords: 'הָרוֹאֶה אֶת הַמָּקוֹם',
    commentary: 'המשנה מלמדת אילו ברכות מברכים כשרואים מקומות או תופעות מיוחדות, כביטוי להכרת הטוב על נסי הבורא.' },
  'ו': { tractate: 'מועד קטן', chapter: 'ג', mishna: 1, firstWords: 'וְאֵלּוּ מְגַלְּחִין בַּמּוֹעֵד',
    commentary: 'המשנה מפרטת מי רשאי להסתפר או להתגלח בחול המועד למרות האיסור הכללי - כגון מי שהגיע מחוץ לארץ ולא הספיק להסתפר לפני החג.' },
  'ז': { tractate: 'מכשירין', chapter: 'ב', mishna: 1, firstWords: 'זֵעַת בָּתִּים',
    commentary: 'המשנה עוסקת בדיני לחות הנוצרת על כלים ומאכלים, והאם היא נחשבת כמכשירה את האוכל לקבל טומאה.' },
  'ח': { tractate: 'חלה', chapter: 'א', mishna: 1, firstWords: 'חֲמֵשֶׁת הַמִּינִין חַיָּבִין בַּחַלָּה', needsReview: true,
    commentary: 'המשנה פותחת ומפרטת אילו חמישה סוגי דגן חייבים בהפרשת חלה.' },
  'ט': { tractate: 'יומא', chapter: 'ד', mishna: 1, firstWords: 'טָרַף בַּקַּלְפִּי',
    commentary: 'המשנה עוסקת בעבודת יום הכיפורים בבית המקדש - הגרלת שני השעירים, "לה׳" ו"לעזאזל".' },
  'י': { tractate: 'שבת', chapter: 'א', mishna: 1, firstWords: 'יְצִיאוֹת הַשַּׁבָּת שְׁתַּיִם',
    commentary: 'המשנה פותחת בדיני איסור הוצאה מרשות לרשות בשבת - כיצד נחשבת "הוצאה" מבחינה הלכתית.' },
  'כ': { tractate: 'ברכות', chapter: 'ו', mishna: 1, firstWords: 'כֵּיצַד מְבָרְכִין עַל הַפֵּרוֹת',
    commentary: 'המשנה מפרטת אילו ברכות מברכים לפני אכילת סוגי פירות ומאכלים שונים.' },
  'ל': { tractate: 'סוכה', chapter: 'ג', mishna: 1, firstWords: 'לוּלָב הַגָּזוּל וְהַיָּבֵשׁ פָּסוּל',
    commentary: 'המשנה עוסקת בדיני כשרות ארבעת המינים - איזה לולב פסול לנטילה במצוות ד׳ מינים.' },
  'מ': { tractate: 'ברכות', chapter: 'ג', mishna: 1, firstWords: 'מִי שֶׁמֵּתוֹ מוּטָל לְפָנָיו',
    commentary: 'המשנה עוסקת בפטור מקריאת שמע וממצוות נוספות למי שעוסק בקבורת קרובו, מתוך כבוד למת ולעיסוקו במצווה.' },
  'נ': { tractate: 'שבת', chapter: 'כא', mishna: 1, firstWords: 'נוֹטֵל אָדָם',
    commentary: 'המשנה עוסקת בדיני טלטול כלים ונר בשבת - מה מותר לטלטל ומה נחשב מוקצה.' },
  'ס': { tractate: 'תענית', chapter: 'ב', mishna: 1, firstWords: 'סֵדֶר תַּעֲנִיּוֹת כֵּיצַד',
    commentary: 'המשנה מתארת את סדר התפילה המיוחד הנאמר בימי תענית ציבור בעת עצירת גשמים.' },
  'ע': { tractate: 'שביעית', chapter: 'א', mishna: 1, firstWords: 'עַד אֵימָתַי חוֹרְשִׁין',
    commentary: 'המשנה עוסקת בדיני עבודת הקרקע בשנת השמיטה - עד מתי מותר לחרוש לפני כניסת השנה השביעית.' },
  'פ': { tractate: 'חלה', chapter: 'ב', mishna: 1, firstWords: 'פֵּרוֹת שֶׁטָּבְלוּ',
    commentary: 'המשנה ממשיכה בדיני הפרשת חלה - דין עיסות שכבר הופרשו מהן תרומה או חלה.' },
  'צ': { tractate: 'פרה', chapter: 'ט', mishna: 1, firstWords: 'צְלוֹחִית שֶׁהִטִּיל',
    commentary: 'המשנה עוסקת בדיני מי החטאת (אפר פרה אדומה) ובמה שפוסל אותם מלטהר.' },
  'ק': { tractate: 'כלאים', chapter: 'ד', mishna: 1, firstWords: 'קַרַחַת הַכֶּרֶם',
    commentary: 'המשנה דנה ב"קרחת הכרם" - שטח פנוי בתוך כרם - וכיצד מותר לזרוע בו בלי לעבור על איסור כלאיים.' },
  'ר': { tractate: 'ראש השנה', chapter: 'ג', mishna: 1, firstWords: 'רָאוּהוּ בֵית דִּין',
    commentary: 'המשנה עוסקת בקידוש החודש על פי ראיית הלבנה החדשה בעדים, וכיצד בית הדין קובע ראש חודש על סמך עדותם.' },
  'ש': { tractate: 'ברכות', chapter: 'ז', mishna: 1, firstWords: 'שְׁלֹשָׁה שֶׁאָכְלוּ',
    commentary: 'פתיחת דיני זימון - שלושה שסעדו יחד חייבים לזמן זה את זה לפני ברכת המזון.' },
  'ת': { tractate: 'ברכות', chapter: 'ד', mishna: 1, firstWords: 'תְּפִלַּת הַשַּׁחַר עַד חֲצוֹת',
    commentary: 'המשנה קובעת את זמני תפילות שחרית, מנחה וערבית.' },
};

// The letters נ-ש-מ-ה are NOT looked up letter-by-letter here: the custom,
// per family guidance, is to add the seven mishnayot of Mikvaot chapter 7
// in full at the end of the learning (regardless of the deceased's name) -
// because the letters of "משנה" (Mishnah) are an anagram of "נשמה" (soul).
export const NESHAMA_ADDENDUM = {
  tractate: 'מקוואות',
  chapter: 'ז',
  mishnaRange: [1, 7],
  note: 'שבע המשניות המלאות של הפרק, זו אחר זו - ולא רק המשנה הפותחת באות מסוימת.',
};

/**
 * Given a first name, returns the ordered list of Mishnayot entries for its
 * letters. Final-form letters (ך ם ן ף ץ) are normalized to their regular
 * form (כ מ נ פ צ), since a Mishnah is never cited by a final letter.
 */
export function mishnayotForName(firstName) {
  const FINAL_TO_REGULAR = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
  const letters = Array.from(firstName.trim()).filter((ch) => /[א-ת]/.test(ch));
  return letters.map((raw) => {
    const letter = FINAL_TO_REGULAR[raw] || raw;
    const entry = MISHNAYOT_BY_LETTER[letter];
    return { letter: raw, ...entry };
  });
}
