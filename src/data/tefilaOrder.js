// Order of prayers for a graveside visit (עלייה לקבר) on a yahrzeit, and
// the nusach-specific texts. Sourced and cross-checked against multiple
// sites (kadish.org.il, ck-nesziona.co.il, ten-maaser.co.il) — see the
// research notes in README.md. NOT reviewed by a rabbi: verify the exact
// wording against a printed siddur / your community's custom before
// relying on it for an actual visit.

import { TEHILLIM_119 } from './tehillim119.js';

export const NUSACH = { ASHKENAZI: 'ashkenazi', SEPHARDI: 'sephardi' };

// The seven Tehillim chapters recited at the graveside, in addition to
// chapter 119 — this list appears consistently across sources for both
// nusachim (no documented difference found between Ashkenazi and Sephardi
// practice for this particular list).
export const GRAVESIDE_PSALMS = [33, 16, 17, 72, 91, 104, 130];

export const CEMETERY_ENTRY_BLESSING = {
  hebrew:
    'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר יָצַר אֶתְכֶם בַּדִּין, וְזָן אֶתְכֶם בַּדִּין, וְכִלְכֵּל אֶתְכֶם בַּדִּין, וְהֵמִית אֶתְכֶם בַּדִּין, וְיוֹדֵעַ מִסְפַּר כֻּלְּכֶם בַּדִּין, וְהוּא עָתִיד לְהַחֲיוֹתְכֶם וּלְקַיֵּם אֶתְכֶם בַּדִּין. בָּרוּךְ אַתָּה ה׳, מְחַיֵּה הַמֵּתִים.',
  condition: 'נאמרת רק אם לא ביקרו בבית קברות יהודי ב-30 הימים האחרונים.',
};

// Sephardi practice also opens with these lines on approaching the grave.
export const SEPHARDI_OPENING = {
  hebrew:
    'אַתָּה גִּבּוֹר לְעוֹלָם ה׳, מְחַיֵּה מֵתִים אַתָּה, רַב לְהוֹשִׁיעַ... וְנֶאֱמָן אַתָּה לְהַחֲיוֹת מֵתִים. בָּרוּךְ אַתָּה ה׳, מְחַיֵּה הַמֵּתִים.',
  note: 'קטע מברכת הגבורות, נאמר לרוב תוך הנחת יד על המצבה, ואחריו "וְנִחֲךָ ה׳ תָּמִיד..."',
};

export const EL_MALEI_RACHAMIM = {
  // Standard Ashkenazi text, male form. {{name}} is replaced with "<first> בן/בת <father>".
  hebrew:
    'אֵל מָלֵא רַחֲמִים שׁוֹכֵן בַּמְּרוֹמִים, הַמְצֵא מְנוּחָה נְכוֹנָה תַּחַת כַּנְפֵי הַשְּׁכִינָה, בְּמַעֲלוֹת קְדוֹשִׁים וּטְהוֹרִים כְּזֹהַר הָרָקִיעַ מַזְהִירִים, אֶת נִשְׁמַת {{name}} שֶׁהָלַךְ/שֶׁהָלְכָה לְעוֹלָמוֹ/לְעוֹלָמָהּ, בְּגַן עֵדֶן תְּהֵא מְנוּחָתוֹ/מְנוּחָתָהּ. לָכֵן בַּעַל הָרַחֲמִים יַסְתִּירֵהוּ/יַסְתִּירֶהָ בְּסֵתֶר כְּנָפָיו לְעוֹלָמִים, וְיִצְרֹר בִּצְרוֹר הַחַיִּים אֶת נִשְׁמָתוֹ/נִשְׁמָתָהּ, ה׳ הוּא נַחֲלָתוֹ/נַחֲלָתָהּ, וְיָנוּחַ/וְתָנוּחַ בְּשָׁלוֹם עַל מִשְׁכָּבוֹ/מִשְׁכָּבָהּ, וְנֹאמַר אָמֵן.',
};

export const HASHKAVA = {
  // Sephardi / Edot HaMizrach equivalent, full text.
  hebrew:
    'טוֹב שֵׁם מִשֶּׁמֶן טוֹב וְיוֹם הַמָּוֶת מִיּוֹם הִוָּלְדוֹ, סוֹף דָּבָר הַכֹּל נִשְׁמָע, אֶת הָאֱלֹהִים יְרָא וְאֶת מִצְוֹתָיו שְׁמֹר כִּי זֶה כָּל הָאָדָם. יַעַלְזוּ חֲסִידִים בְּכָבוֹד יְרַנְּנוּ עַל מִשְׁכְּבוֹתָם. מְנוּחָה נְכוֹנָה בִּישִׁיבָה עֶלְיוֹנָה, תַּחַת כַּנְפֵי הַשְּׁכִינָה, בְּמַעֲלַת קְדוֹשִׁים וּטְהוֹרִים, כְּזֹהַר הָרָקִיעַ מְאִירִים וּמַזְהִירִים, וַחֲלוּץ עֲצָמוֹת, וְכַפָּרַת אֲשָׁמוֹת, וְהַרְחָקַת פֶּשַׁע וְהַקְרָבַת יֶשַׁע, וְחֶמְלָה וַחֲנִינָה מִלִּפְנֵי צוּר שׁוֹכֵן מְעוֹנָה. וְחֶלְקָא טָבָא לְחַיֵּי הָעוֹלָם הַבָּא, שָׁם תְּהֵא מְנָת וּמְחִצַּת וִישִׁיבַת נֶפֶשׁ הַשֵּׁם הַטּוֹב {{name}}. רוּחַ ה׳ תְּנִיחֶנּוּ בְּגַן עֵדֶן דְּאִתְפְּטַר מִן עָלְמָא הָדֵין כִּרְעוּת אֱלָהֲנָא מָארֵי שְׁמַיָּא וְאַרְעָא. מֶלֶךְ מַלְכֵי הַמְּלָכִים בְּרַחֲמָיו יְרַחֵם עָלָיו, וְיָחוּס וְיַחְמֹל עָלָיו. וְיִצְרֹר בִּצְרוֹר הַחַיִּים נִשְׁמָתוֹ, וְיָשִׂים כָּבוֹד מְנוּחָתוֹ, לֵאמֹר ה׳ הוּא נַחֲלָתוֹ. וְיִלָּוֶה אֵלָיו הַשָּׁלוֹם, וְעַל מִשְׁכָּבוֹ יִהְיֶה שָׁלוֹם. הוּא וְכָל בְּנֵי יִשְׂרָאֵל הַשּׁוֹכְבִים עִמּוֹ, כֻּלָּם יִהְיוּ בִּכְלַל הָרַחֲמִים וְהַסְּלִיחוֹת, וְכֵן יְהִי רָצוֹן וְנֹאמַר אָמֵן.',
};

export const YEHI_RATZON_CLOSING =
  'יְהִי רָצוֹן מִלְּפָנֶיךָ ה׳ אֱלֹהֵינוּ וֵאלֹהֵי אֲבוֹתֵינוּ, שֶׁתְּרַחֵם עַל נִשְׁמַת {{name}}, וְתִזְכֶּה אוֹתוֹ/אוֹתָהּ לְגַן עֵדֶן וְנַחַת רוּחַ לִפְנֵי כִּסֵּא כְבוֹדֶךָ, וְנִזְכֶּה כֻּלָּנוּ לְקַבֵּל פְּנֵי מָשִׁיחַ צִדְקֵנוּ בִּמְהֵרָה בְיָמֵינוּ, אָמֵן.';

/** All 22 letters of `firstName`, each mapped to its Tehillim 119 stanza. */
function stanzasForName(firstName) {
  const FINAL_TO_REGULAR = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
  return Array.from(firstName.trim())
    .filter((ch) => /[א-ת]/.test(ch))
    .map((raw) => {
      const letter = FINAL_TO_REGULAR[raw] || raw;
      return { letter: raw, verses: TEHILLIM_119[letter] };
    });
}

/**
 * Builds the ordered list of Tehillim 119 stanzas for a graveside recital:
 * first the letters of the first name, then נ-ש-מ-ה (per family custom,
 * added regardless of whether those letters already appear in the name).
 */
export function tehillim119ForYahrzeit(firstName) {
  return {
    nameStanzas: stanzasForName(firstName),
    neshamaStanzas: stanzasForName('נשמה'),
  };
}

/** Fills {{name}} and (best-effort) gendered slashed forms in a prayer template. */
export function fillPrayerName(template, fullName, gender = 'male') {
  let text = template.replaceAll('{{name}}', fullName);
  // Resolve "X/Y" gendered alternatives: keep the first for male, second for female.
  text = text.replace(/(\S+)\/(\S+)/g, (_, m, f) => (gender === 'female' ? f : m));
  return text;
}

export const PRAYER_STEPS = [
  { id: 'entry-blessing', title: 'ברכת הכניסה לבית הקברות', nusach: 'both' },
  { id: 'sephardi-opening', title: 'פתיחה בהגעה לקבר', nusach: 'sephardi' },
  { id: 'seven-psalms', title: 'שבעה פרקי תהילים', nusach: 'both' },
  { id: 'tehillim-119', title: 'תהילים קי״ט לפי אותיות השם, ואחריהן נ-ש-מ-ה', nusach: 'both' },
  { id: 'kaddish', title: 'קדיש יתום / דרבנן', nusach: 'both', note: 'דורש מניין' },
  { id: 'memorial-prayer', title: 'אל מלא רחמים / השכבה', nusach: 'both' },
  { id: 'yehi-ratzon', title: 'יהי רצון לסיום', nusach: 'both' },
];
