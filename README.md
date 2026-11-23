# 💍 Forever Begins | Wedding Countdown & Daily Love Notes ❤️

> **Engagement:** 20.11.2026  
> **Marriage (Muhurtham & Reception):** May 16 & 17, 2027  
> **Goal:** Send daily sweet love notes in Tamil & English + Wedding countdown to make your fiancée feel happy and surprised every single day!

---

## 🌟 அம்சங்கள் (Features)

1. **லைவ் கல்யாண கவுண்டவுன் (Live Countdown):**
   - மே 16 வரை இன்னும் எத்தனை நாட்கள், மணித்துளிகள், நொடிகள் உள்ளன என்று ஓடிக்கொண்டிருக்கும்.
   - திருமண முன்னேற்ற பார் (Progress Bar).

2. **இன்றைய காதல் மடல் (Daily Surprise Love Letter Envelope):**
   - தினசரி திறக்கும் அழகான என்வலப் அனிமேஷன் + ஹார்ட் கான்ஃபெட்டி (Confetti Hearts).
   - **ஆங்கில காதல் குறிப்பு (English Sweet Note)**.
   - **தூய தமிழ் காதல் வரிகள் (Tamil Love Note)**.
   - அவள் வாட்ஸ்அப்பில் உங்களுக்கு உடனே பதில் அனுப்பும் பட்டன் (WhatsApp Reaction).

3. **கஸ்டம் மெசேஜ் வசதி (Custom Message by Groom):**
   - ஸ்பெஷல் நாட்களில் (பிறந்தநாள், அல்லது நீங்கள் தனியாக சொல்ல நினைக்கும் விஷயங்கள்) நீங்கள் எழுதிய பிரத்யேக மெசேஜை மாற்றிக்கொள்ளலாம்.
   - சீக்ரெட் அட்மின் பின் (Default PIN: `1617`).

4. **கடந்த நினைவுகள் (Love Vault Archive):**
   - கடந்த நாட்களில் திறக்கப்பட்ட அனைத்து காதல் மடல்களையும் அவள் எப்போது வேண்டுமானாலும் திரும்பப் படித்துப் பார்க்கலாம்.

5. **பின்னணி இசை (Romantic Ambient BGM):**
   - அமைதியான ரொமாண்டிக் மெலடியை ஆப்-ல் பிளே செய்துகொள்ளலாம்.

---

## 🚀 ப்ராஜெக்ட்டை ரன் செய்வது எப்படி? (How to Run Locally)

```bash
# 1. Dependencies இன்ஸ்டால் செய்ய
npm install

# 2. Local சர்வரைத் தொடங்க
npm run dev
```
உடனே பிரவுசரில் `http://localhost:3000` ஓபன் செய்து பார்க்கலாம்!

---

## 🌐 இணையத்தில் இலவசமாக லைவ் செய்வது எப்படி? (Free Deployment to Vercel)

1. இந்த போல்டரை GitHub-ல் ஒரு புதிய Repository-ஆக ஏற்றவும்:
   ```bash
   git init
   git add .
   git commit -m "Wedding countdown app"
   ```
2. [Vercel.com](https://vercel.com) அல்லது [Netlify.com](https://netlify.com)-ல் லாகின் செய்து, இந்த GitHub repo-வை Import செய்யவும்.
3. 1 நிமிடத்தில் உங்கள் வெப்சைட் லைவ் ஆகிவிடும் (எ.கா: `https://our-wedding-countdown.vercel.app`).
4. அந்த லிங்கை உங்கள் வருங்கால மனைவிக்கு அனுப்பி வைக்கலாம்!

---

## 🤖 டெலிகிராம் மூலம் தினமும் காலையில் ஆட்டோமேட்டிக்காக மெசேஜ் அனுப்ப:

1. டெலிகிராமில் `@BotFather` சென்று `/newbot` கொடுத்து உங்கள் போட் டோக்கன் (Bot Token) பெறவும்.
2. `@userinfobot` சென்று அவள் அல்லது உங்கள் Chat ID பெறவும்.
3. `telegram_bot.py` ஃபைலில் `BOT_TOKEN` மற்றும் `CHAT_ID` கொடுக்கவும்.
4. GitHub Actions அல்லது இலவச cron-job.org மூலம் தினமும் காலை 7:30 மணிக்கு இதை ரன் செய்யலாம்!
