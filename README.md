# סידור עבודה פיקוח טכנולוגי

אתר סטטי (קובץ `index.html` אחד) שמסונכרן מול Firebase Realtime Database.

## הגדרה חד-פעמית של הרשאות עריכה

העריכה מוגנת בכניסה עם חשבון Google דרך Firebase Authentication. אין יותר סיסמה בקוד.

1. **הפעלת כניסה עם Google:** ב-[Firebase Console](https://console.firebase.google.com/) → הפרויקט `schedule-a9777` → **Authentication** → **Sign-in method** → להפעיל **Google**.
2. **דומיין מורשה:** באותו מסך → **Settings** → **Authorized domains** → להוסיף את הדומיין שבו האתר מתארח (למשל `erezc1981.github.io`).
3. **apiKey:** **Project settings** → **General** → **Your apps** → אפליקציית Web (ליצור אחת אם אין) → להעתיק את `apiKey` לשדה `FIREBASE_CONFIG.apiKey` ב-`index.html`.
   (מפתח זה אינו סוד — האבטחה נקבעת ב-Security Rules.)
4. **מנהלים:** כל מנהל לוחץ על "כניסת מנהל" ונכנס עם Google. האתר יציג הודעה עם ה-UID שלו.
   ב-**Realtime Database** → **Data** יוצרים את הנתיב `admins/<UID>` עם הערך `true` (בוליאני).
5. **כללי אבטחה:** ב-**Realtime Database** → **Rules** מדביקים את התוכן של `database.rules.json` ולוחצים **Publish**.

> סדר מומלץ: שלבים 1–4 קודם, ורק אז שלב 5. אחרי שלב 5 רק מי שמופיע תחת `admins` יכול לשנות נתונים. הצפייה בסידור נשארת פתוחה לכולם.

## ניהול שוטרים

מנהל מחובר רואה כפתור **ניהול שוטרים**: הוספה, הסרה, שינוי סדר, סוג (סמב"ץ / יומי) וצבע.
הרשימה נשמרת ב-Firebase תחת `police_officers`. הסרת שוטר רק מסתירה אותו — המשמרות שלו נשמרות.

## עיצוב (Tailwind)

ה-CSS נבנה מראש במקום לטעון את Tailwind מ-CDN.
- בכל דחיפה ל-`main`, ה-workflow `.github/workflows/pages.yml` בונה את `tailwind.css` ומפרסם את האתר. גם עריכה של `index.html` ישירות באתר GitHub מקבלת עיצוב מעודכן.
- לבנייה מקומית: `npm install` ואז `npm run build:css`.
- הגדרת GitHub Pages צריכה להיות **Settings → Pages → Source: GitHub Actions**.

## עבודה בלי חיבור

האתר שומר עותק של הסידור האחרון במכשיר ו-Service Worker (`sw.js`) שומר את קבצי האתר.
בלי חיבור רואים את הסידור האחרון שנטען; עריכה דורשת חיבור.

## אבטחה

- **Content-Security-Policy** בכל עמוד: הדפדפן טוען קוד רק מהמקורות המותרים.
- **Subresource Integrity:** קבצי Firebase ו-Font Awesome נטענים עם hash. אם תעדכנו גרסה, צריך לחשב hash חדש.
- **כללי Firebase** (`database.rules.json`) בודקים גם את מבנה הנתונים ואת אורכם. אחרי כל שינוי בקובץ צריך לפרסם אותו ב-Firebase Console → Realtime Database → Rules.

## עמודים משפטיים

`terms.html`, `privacy.html`, `accessibility.html`. כשמשנים תוכן, מעדכנים גם את תאריך "עודכן לאחרונה".
