# לוח הזכרונות — יום הזכרון

אפליקציית ווב משפחתית לניהול תאריכי יום הזכרון, לימוד משניות לפי אותיות השם,
סדר תפילה בעלייה לקבר (נוסח אשכנזי/ספרדי), ועמוד זיכרון משותף עם תמונות ומלל.

⚠️ **התוכן הדתי (משניות, נוסחי תפילה) לא עבר בדיקה רבנית.** לפני שימוש בפועל,
יש לוודא את הנוסחים מול רב או מקור הלכתי מוסמך — ראו הערות בקבצים
`src/data/mishnayot.js` ו-`src/data/tefilaOrder.js`.

## מה כבר בנוי

- שלד React + Vite
- מנוע המרה עברי↔לועזי מלא, מאומת מול hebcal.com (`src/lib/hebrewCalendar.js`)
- דשבורד, טופס הוספה/עריכה, עמוד נפטר עם 3 טאבים
- כללי אבטחה ל-Firestore ול-Storage
- עדיין לא מחובר לפרויקט Firebase אמיתי — זה השלב הבא, למטה.

## הקמת פרויקט Firebase (בידיים שלך)

הכניסה לחשבונות והפעלת שירותים בתשלום/חינמיים היא פעולה שאת/ה מבצע/ת בעצמך.
תעקוב/תעקבי אחר הצעדים הבאים:

### 1. יצירת הפרויקט
1. גשו ל-[console.firebase.google.com](https://console.firebase.google.com) והתחברו עם חשבון Google שלכם.
2. "Add project" → תנו שם (למשל `yom-hazikaron`) → אפשר לכבות Google Analytics (לא נדרש).

### 2. הוספת אפליקציית Web
1. במסך הראשי של הפרויקט, לחצו על סמל ה-`</>` ("Add app" → Web).
2. תנו כינוי (למשל "web") — **לא** צריך Firebase Hosting בשלב הזה, יסומן בהמשך.
3. יופיע קטע קוד עם `firebaseConfig` — העתיקו את הערכים (apiKey, authDomain וכו')
   לתוך [src/firebase.js](src/firebase.js), במקום כל ה-`REPLACE_ME`.

### 3. הפעלת Firestore (מסד הנתונים)
1. בתפריט הצד: Build → Firestore Database → "Create database".
2. בחרו מיקום (Region) קרוב אליכם (למשל `europe-west1`).
3. התחילו במצב "production" — כללי האבטחה כבר מוכנים בקובץ [firestore.rules](firestore.rules).
4. **שימו לב ל-Database ID** שנוצר (בפרויקט הזה זה `yom-hazikaron`, לא `(default)`) —
   הוא כבר מוזן ב-[src/firebase.js](src/firebase.js) וב-[firebase.json](firebase.json).
   אם יצרתם מסד עם ID אחר, עדכנו את שני הקבצים בהתאם.

**כדי שהאפליקציה תוכל לקרוא/לכתוב בפועל**, צריך גם לפרסם את כללי האבטחה —
או דרך ה-CLI (שלב 7 למטה), או ידנית: Firestore Database → לשונית **Rules** →
העתיקו לשם את תוכן [firestore.rules](firestore.rules) → **Publish**. אותו דבר
ב-Storage → **Rules** עם תוכן [storage.rules](storage.rules).

### 4. הפעלת Storage (לתמונות בעמוד הזיכרון)
1. Build → Storage → "Get started" → אותו מיקום כמו ב-Firestore.

### 5. הפעלת Google Sign-In
1. Build → Authentication → "Get started" → לשונית "Sign-in method".
2. הפעילו את "Google", בחרו מייל תמיכה, שמרו.

### 6. חיבור המחשב שלכם ל-Firebase CLI
פתחו טרמינל בתיקיית הפרויקט (`C:\Users\nafei\Documents\יארצייט`) והריצו:

```bash
npm install -g firebase-tools
firebase login
firebase use --add
```

ב-`firebase use --add` תתבקשו לבחור את הפרויקט שיצרתם, ולתת לו כינוי (למשל `default`).

### 7. פריסת כללי האבטחה
```bash
firebase deploy --only firestore:rules,storage
```

### 8. פריסת האתר (Firebase Hosting)
בפעם הראשונה בלבד:
```bash
firebase init hosting
```
- "Use an existing project" → בחרו את הפרויקט.
- Public directory: `dist`
- Configure as single-page app: **Yes**
- Set up automatic builds with GitHub: אפשר לדלג (No) לשלב זה.

לאחר מכן, בכל פעם שתרצו לפרסם עדכון:
```bash
npm run deploy
```
(מריץ build ואז `firebase deploy` יחד — מוגדר ב-[package.json](package.json)).

בסיום תקבלו כתובת מהצורה `https://<project-id>.web.app` — זו הכתובת שתשתפו
עם בני המשפחה, ותעבוד מכל מכשיר (איפון, אנדרואיד, מחשב) בלי צורך בהתקנה.

## חיבור ל-GitHub שלכם (אופציונלי אך מומלץ, יש לכם כבר חשבון)

```bash
cd "C:\Users\nafei\Documents\יארצייט"
git init
git add .
git commit -m "התחלת פרויקט לוח הזכרונות"
```

ואז ביצרתם ריפו ריק ב-GitHub (בלי README) ותריצו את הפקודות ש-GitHub מציע
("...or push an existing repository from the command line").

## פיתוח מקומי

```bash
npm install
npm run dev
```

יפתח שרת פיתוח מקומי (בדרך כלל בכתובת http://localhost:5173).

## מבנה הנתונים ב-Firestore

```
people/{personId}
  fullName: string      — "אברהם בן יצחק כהן"
  firstName: string     — "אברהם" (לצורך המשניות/תהילים)
  hebrewDay: number      (1-30)
  hebrewMonth: number    (1=ניסן ... 7=תשרי ... 12/13=אדר)
  hebrewYear: number      (למשל 5784)
  nusach: "ashkenazi" | "sephardi"

  posts/{postId}          — עמוד הזיכרון (שלב הבא)
    text: string
    imageUrl: string | null
    authorName: string
    authorUid: string
    createdAt: timestamp
```

## מה עוד שווה להוסיף בהמשך

- **הוספה ליומן**: כרגע לא ממומש. אפשרות פשוטה: קישור "הוספה ליומן Google"
  (`calendar.google.com/calendar/render?action=TEMPLATE&...`) לכל תאריך יחול.
- **התראות**: Firebase Cloud Functions + Cloud Scheduler שיריצו פעם ביום
  ויבדקו אם מחר יום הזכרון של מישהו, וישלחו התראה (למשל במייל או Push).
- **מחיקת אנשים**: הכללים מאפשרים מחיקה חופשית של `people` — כדאי לשקול
  להגביל בהמשך אם תרצו.
- **בדיקה רבנית**: כאמור למעלה — התוכן הדתי טרם אומת במלואו.
# yom-hazikaron
