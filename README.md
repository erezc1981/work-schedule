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
