// Order of prayers for a graveside visit (עלייה לקבר) on a yahrzeit, and
// the nusach-specific texts.
//
// Sephardi content sourced directly from kadisha.org/prayers-by-name (the
// family's own reference site) — fetched and cross-checked verbatim
// against the live page. Ashkenazi order and content confirmed directly
// by the family against their own siddur. See README.md for details.
// NOT reviewed by a rabbi beyond that: verify against your community's
// custom before relying on it for an actual visit.

import { TEHILLIM_119 } from './tehillim119.js';
import { GRAVESIDE_PSALM_TEXT } from './gravesidePsalms.js';

export const NUSACH = { ASHKENAZI: 'ashkenazi', SEPHARDI: 'sephardi' };

// The seven Tehillim chapters recited at the graveside, in addition to
// chapter 119 — confirmed identical for both nusachim (cross-checked word
// for word against kadisha.org's Sephardi text). Full verse text lives in
// gravesidePsalms.js.
export const GRAVESIDE_PSALMS = [33, 16, 17, 72, 91, 104, 130].map((chapter) => ({
  chapter,
  verses: GRAVESIDE_PSALM_TEXT[chapter],
}));

// --- Ashkenazi-specific texts ---

export const CEMETERY_ENTRY_BLESSING = {
  hebrew:
    'בָּרוּךְ אַתָּה ה׳ אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר יָצַר אֶתְכֶם בַּדִּין, וְזָן אֶתְכֶם בַּדִּין, וְכִלְכֵּל אֶתְכֶם בַּדִּין, וְהֵמִית אֶתְכֶם בַּדִּין, וְיוֹדֵעַ מִסְפַּר כֻּלְּכֶם בַּדִּין, וְהוּא עָתִיד לְהַחֲיוֹתְכֶם וּלְקַיֵּם אֶתְכֶם בַּדִּין. בָּרוּךְ אַתָּה ה׳, מְחַיֵּה הַמֵּתִים.',
  condition: 'נאמרת רק אם לא ביקרו בבית קברות יהודי ב-30 הימים האחרונים.',
};

export const EL_MALEI_RACHAMIM = {
  // Standard Ashkenazi text, male form. {{name}} is replaced with "<first> בן/בת <father>".
  hebrew:
    'אֵל מָלֵא רַחֲמִים שׁוֹכֵן בַּמְּרוֹמִים, הַמְצֵא מְנוּחָה נְכוֹנָה תַּחַת כַּנְפֵי הַשְּׁכִינָה, בְּמַעֲלוֹת קְדוֹשִׁים וּטְהוֹרִים כְּזֹהַר הָרָקִיעַ מַזְהִירִים, אֶת נִשְׁמַת {{name}} שֶׁהָלַךְ/שֶׁהָלְכָה לְעוֹלָמוֹ/לְעוֹלָמָהּ, בְּגַן עֵדֶן תְּהֵא מְנוּחָתוֹ/מְנוּחָתָהּ. לָכֵן בַּעַל הָרַחֲמִים יַסְתִּירֵהוּ/יַסְתִּירֶהָ בְּסֵתֶר כְּנָפָיו לְעוֹלָמִים, וְיִצְרֹר בִּצְרוֹר הַחַיִּים אֶת נִשְׁמָתוֹ/נִשְׁמָתָהּ, ה׳ הוּא נַחֲלָתוֹ/נַחֲלָתָהּ, וְיָנוּחַ/וְתָנוּחַ בְּשָׁלוֹם עַל מִשְׁכָּבוֹ/מִשְׁכָּבָהּ, וְנֹאמַר אָמֵן.',
};

// Standard Mourner's Kaddish (קדיש יתום), Ashkenazi nusach — one of the
// most universally standardized Jewish liturgical texts. The parenthesized
// lines are the congregation's response (recited only where there is a
// minyan).
export const KADDISH_YATOM = {
  hebrew:
    'יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא. בְּעָלְמָא דִּי בְרָא כִרְעוּתֵהּ, וְיַמְלִיךְ מַלְכוּתֵהּ, וְיַצְמַח פֻּרְקָנֵהּ וִיקָרֵב מְשִׁיחֵהּ, בְּחַיֵּיכוֹן וּבְיוֹמֵיכוֹן וּבְחַיֵּי דְכָל בֵּית יִשְׂרָאֵל, בַּעֲגָלָא וּבִזְמַן קָרִיב, וְאִמְרוּ אָמֵן.\n(הקהל: אָמֵן. יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא.)\nיִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל שְׁמֵהּ דְּקֻדְשָׁא בְּרִיךְ הוּא, (הקהל: בְּרִיךְ הוּא.) לְעֵלָּא מִן כָּל בִּרְכָתָא וְשִׁירָתָא תֻּשְׁבְּחָתָא וְנֶחָמָתָא, דַּאֲמִירָן בְּעָלְמָא, וְאִמְרוּ אָמֵן.\nעֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל, וְאִמְרוּ אָמֵן.',
  note: 'טעון מניין (עשרה גברים). הנוסח כאן אחיד כמעט לחלוטין בכל הסידורים האשכנזיים.',
};

// "תפילה לעילוי נשמת הנפטר" — Ashkenazi custom, recited between Tehillim
// and the Kaddish (confirmed by the family; does not appear in the
// Sephardi source used for this app).
export const TEFILA_LEILUY_NESHAMA = {
  hebrew:
    'אָנָּא אֲדֹנָ-י מָלֵא רַחֲמִים, אֲשֶׁר בְּיָדְךָ נֶפֶשׁ כָּל חַי וְרוּחַ כָּל בְּשַׂר אִישׁ - יְהִי נָא לְרָצוֹן לְפָנֶיךָ תּוֹרָתֵנוּ וּתְפִילָתֵנוּ בַּעֲבוּר נִשְׁמַת {{name}}, וּגְמוֹל נָא עִמּוֹ/עִמָּהּ בְּחַסְדְּךָ הַגָּדוֹל לִפְתּוֹחַ לוֹ/לָהּ שַׁעֲרֵי רַחֲמִים וָחֶסֶד וְשַׁעֲרֵי גַן עֵדֶן, וּתְקַבֵּל אוֹתוֹ/אוֹתָהּ בְּאַהֲבָה וּבְחִיבָּה, וּשְׁלַח לוֹ/לָהּ מַלְאָכֶיךָ הַקְּדוֹשִׁים וְהַטְּהוֹרִים לְהוֹלִיכוֹ/לְהוֹלִיכָהּ וּלְהוֹשִׁיבוֹ/וּלְהוֹשִׁיבָהּ תַּחַת עֵץ הַחַיִּים, אֵצֶל נִשְׁמוֹת הַצַּדִּיקִים וְהַצַּדְקָנִיּוֹת, חֲסִידִים וַחֲסִידוֹת, לֵיהָנוֹת מִזִּיו שְׁכִינָתֶךָ, לְהַשְׂבִּיעוֹ/לְהַשְׂבִּיעָהּ מִטּוּבְךָ הַצָּפוּן לַצַּדִּיקִים. וְהַגּוּף יָנוּחַ בַּקֶּבֶר בִּמְנוּחָה נְכוֹנָה, בְּחֶדְוָה וּבְשִׂמְחָה וְשָׁלוֹם, כְּדִכְתִיב: יָבוֹא שָׁלוֹם יָנוּחוּ עַל מִשְׁכְּבוֹתָם הוֹלֵךְ נְכֹחוֹ, וּכְתִיב: יַעְלְזוּ חֲסִידִים בְּכָבוֹד יְרַנְּנוּ עַל מִשְׁכְּבוֹתָם, וּכְתִיב: אִם תִּשְׁכַּב לֹא תִפְחָד וְשָׁכַבְתָּ וְעָרְבָה שְׁנָתֶךָ.\nוְתִשְׁמוֹר אוֹתוֹ/אוֹתָהּ מֵחִיבּוּט הַקֶּבֶר וּמֵרִימָּה וְתוֹלֵעָה, וְתִסְלַח וְתִמְחוֹל לוֹ/לָהּ עַל כָּל פְּשָׁעָיו/פְּשָׁעֶיהָ, כִּי אֵין אָדָם צַדִּיק בָּאָרֶץ אֲשֶׁר יַעֲשֶׂה טּוֹב וְלֹא יֶחֱטָא, וּזְכוֹר לוֹ/לָהּ זְכֻיּוֹתָיו/זְכֻיּוֹתֶיהָ וְצִדְקוֹתָיו/וְצִדְקוֹתֶיהָ אֲשֶׁר עָשָׂה/עָשְׂתָה, וְתַשְׁפִּיעַ לוֹ/לָהּ מִנִּשְׁמָתוֹ/מִנִּשְׁמָתָהּ לְדַשֵּׁן עַצְמוֹתָיו/עַצְמוֹתֶיהָ בַּקֶּבֶר מֵרוֹב טוּב הַצָּפוּן לַצַּדִּיקִים, דִּכְתִיב: מָה רַב טוּבְךָ אֲשֶׁר צָפַנְתָּ לִּירֵאֶיךָ, וּכְתִיב: שׁוֹמֵר כָּל עַצְמוֹתָיו אַחַת מֵהֵנָּה לֹא נִשְׁבָּרָה.\nוְתַשְׁכּוּן בֶּטַח בָּדָד, וְשַׁאֲנָן מִפַּחַד רָעָה וְאַל יִרְאֶה/תִּרְאֶה פְּנֵי גֵיהִנּוֹם. וְנִשְׁמָתוֹ/וְנִשְׁמָתָהּ תְּהֵא צְרוּרָה בִּצְרוֹר הַחַיִּים וּלְהַחֲיוֹתוֹ/וּלְהַחֲיוֹתָהּ בִּתְחִיַּת הַמֵּתִים עִם כָּל מֵתֵי עַמְּךָ יִשְׂרָאֵל בְּרַחֲמִים. אָמֵן.',
};

// --- Sephardi-specific texts (kadisha.org/prayers-by-name) ---

// Recited only if 30+ days since the last cemetery visit: the Gevurot
// blessing (2nd blessing of the Amidah) followed directly by Asher Yatzar.
export const SEPHARDI_ENTRY_CONDITIONAL = {
  hebrew:
    'אַתָּה גִּבּוֹר לְעוֹלָם אֲדֹנָי, מְחַיֶּה מֵתִים אַתָּה, רַב לְהוֹשִׁיעַ. מְכַלְכֵּל חַיִּים בְּחֶסֶד, מְחַיֶּה מֵתִים בְּרַחֲמִים רַבִּים, סוֹמֵךְ נוֹפְלִים, וְרוֹפֵא חוֹלִים, וּמַתִּיר אֲסוּרִים, וּמְקַיֵּם אֱמוּנָתוֹ לִישֵׁנֵי עָפָר. מִי כָמוֹךָ בַּעַל גְּבוּרוֹת וּמִי דּוֹמֶה לָּךְ, מֶלֶךְ מֵמִית וּמְחַיֶּה וּמַצְמִיחַ יְשׁוּעָה. וְנֶאֱמָן אַתָּה לְהַחֲיוֹת מֵתִים. בָּרוּךְ אַתָּה אֲדֹנָי, מְחַיֵּה הַמֵּתִים.\nבָּרוּךְ אַתָּה אֲדֹנָי אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם, אֲשֶׁר יָצַר אֶתְכֶם בַּדִּין, וְזָן אֶתְכֶם בַּדִּין, וְכִלְכֵּל אֶתְכֶם בַּדִּין, וְהֵמִית אֶתְכֶם בַּדִּין, וְיוֹדֵעַ מִסְפַּר כֻּלְּכֶם, וְהוּא עָתִיד לְהַחֲיוֹתְכֶם וּלְקַיֵּם אֶתְכֶם בַּדִּין. בָּרוּךְ אַתָּה אֲדֹנָי, מְחַיֵּה הַמֵּתִים.',
  condition: 'נאמרת רק אם לא ביקרו בבית קברות יהודי ב-30 הימים האחרונים.',
};

// Said every visit, upon reaching the grave, while placing the left hand
// on the gravestone.
export const SEPHARDI_GRAVE_ARRIVAL = {
  hebrew:
    'וְנָחֲךָ אֲדֹנָי תָּמִיד וְהִשְׂבִּיעַ בְּצַחְצָחוֹת נַפְשֶׁךָ וְעַצְמֹתֶיךָ יַחֲלִיץ, וְהָיִיתָ כְּגַן רָוֶה וּכְמוֹצָא מַיִם אֲשֶׁר לֹא יְכַזְּבוּ מֵימָיו. וּבָנוּ מִמְּךָ חָרְבוֹת עוֹלָם, מוֹסְדֵי דוֹר וָדוֹר תְּקוֹמֵם, וְקֹרָא לְךָ גֹּדֵר פֶּרֶץ מְשֹׁבֵב נְתִיבוֹת לָשָׁבֶת. תִּשְׁכַּב בְּשָׁלוֹם וְתִישַׁן בְּשָׁלוֹם עַד בֹּא מְנַחֵם מַשְׁמִיעַ שָׁלוֹם.',
  note: 'נאמר תוך הנחת יד שמאל על המצבה, בכל עלייה לקבר (לא רק אם עברו 30 יום).',
};

// קדיש על ישראל / דרבנן — recited (per this Sephardi source) after the
// Tehillim, before the Hashkava. Includes the extra "על ישראל ועל רבנן"
// paragraph that plain Kaddish Yatom does not have — fitting since it
// follows Torah study (the Mishnayot).
export const KADDISH_DRABBANAN = {
  hebrew:
    'יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא.\n(הקהל: אָמֵן.)\nבְּעָלְמָא דִּי בְרָא כִרְעוּתֵהּ, וְיַמְלִיךְ מַלְכוּתֵהּ, וְיַצְמַח פֻּרְקָנֵהּ וִיקָרֵב מְשִׁיחֵהּ.\n(הקהל: אָמֵן.)\nבְּחַיֵּיכוֹן וּבְיוֹמֵיכוֹן וּבְחַיֵּי דְכָל בֵּית יִשְׂרָאֵל, בַּעֲגָלָא וּבִזְמַן קָרִיב, וְאִמְרוּ אָמֵן.\n(הקהל: אָמֵן.)\nיְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא. יִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל שְׁמֵהּ דְּקֻדְשָׁא בְּרִיךְ הוּא.\n(הקהל: אָמֵן.)\nלְעֵלָּא מִן כָּל בִּרְכָתָא וְשִׁירָתָא, תֻּשְׁבְּחָתָא וְנֶחֱמָתָא, דַּאֲמִירָן בְּעָלְמָא, וְאִמְרוּ אָמֵן.\n(הקהל: אָמֵן.)\nעַל יִשְׂרָאֵל וְעַל רַבָּנָן, וְעַל תַּלְמִידֵיהוֹן וְעַל כָּל תַּלְמִידֵי תַלְמִידֵיהוֹן, דְּעָסְקִין בְּאוֹרַיְתָא קַדִּשְׁתָּא, דִּי בְאַתְרָא הָדֵין וְדִי בְכָל אֲתַר וַאֲתַר, יְהֵא לָנָא וּלְהוֹן וּלְכוֹן חִנָּא וְחִסְדָּא וְרַחֲמֵי מִן קֳדָם מָארֵי שְׁמַיָּא וְאַרְעָא, וְאִמְרוּ אָמֵן.\n(הקהל: אָמֵן.)\nיְהֵא שְׁלָמָא רַבָּא מִן שְׁמַיָּא, חַיִּים וְשָׂבָע וִישׁוּעָה וְנֶחָמָה וְשֵׁיזָבָא וּרְפוּאָה וּגְאֻלָּה וּסְלִיחָה וְכַפָּרָה וְרֵיוַח וְהַצָּלָה, לָנוּ וּלְכָל עַמּוֹ יִשְׂרָאֵל, וְאִמְרוּ אָמֵן.\n(הקהל: אָמֵן.)\nעֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו, הוּא בְּרַחֲמָיו יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל עַמּוֹ יִשְׂרָאֵל, וְאִמְרוּ אָמֵן.',
  note: 'טעון מניין (עשרה גברים).',
};

// The source explicitly recommends this SHORT Hashkava as "better and more
// beneficial for the soul" than the longer version, so it is the default
// here. {{name}} inserted as "פב״פ" position.
export const HASHKAVA = {
  hebrew:
    'הַמְרַחֵם עַל כָּל בְּרִיּוֹתָיו הוּא יָחוֹס וְיַחְמוֹל וִירַחֵם עַל נֶפֶשׁ, רוּחַ וּנְשָׁמָה שֶׁל {{name}}. רוּחַ אֲדֹנָי תְּנִיחֶנּוּ/תְּנִיחֶנָּה בְּגַן עֵדֶן.',
  note: 'הנוסח המומלץ במקור (״טוב ומועיל יותר לנשמת המת לומר השכבה זו בקיצור״). קיים גם נוסח ארוך יותר הנאמר לאדם גדול בחכמה וביראת שמים.',
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

// Order confirmed directly by the family for Ashkenazi; Sephardi order
// confirmed against kadisha.org/prayers-by-name.
export const PRAYER_STEPS = [
  { id: 'entry-blessing', title: 'ברכת הכניסה לבית הקברות', nusach: 'both' },
  { id: 'grave-arrival', title: 'בהגעה לקבר (הנחת יד)', nusach: 'sephardi' },
  { id: 'seven-psalms', title: 'שבעה פרקי תהילים', nusach: 'both' },
  { id: 'tehillim-119', title: 'תהילים קי״ט לפי אותיות השם, ואחריהן נ-ש-מ-ה', nusach: 'both' },
  { id: 'leiluy-neshama', title: 'תפילה לעילוי נשמת הנפטר', nusach: 'ashkenazi' },
  { id: 'kaddish', title: 'קדיש', nusach: 'both', note: 'דורש מניין' },
  { id: 'memorial-prayer', title: 'אל מלא רחמים / השכבה', nusach: 'both' },
  { id: 'yehi-ratzon', title: 'יהי רצון לסיום', nusach: 'sephardi' },
];
