"""
Telegram Daily Love Notification Bot for Fiancée ❤️💍
=====================================================
This script sends a sweet good morning love note + wedding countdown
directly to your fiancée's Telegram every day at 7:30 AM!

Setup in 2 Minutes:
1. Create a Telegram Bot via @BotFather on Telegram (get BOT_TOKEN).
2. Get her Telegram Chat ID or your couple group Chat ID via @userinfobot.
3. Replace BOT_TOKEN and CHAT_ID below or pass them as environment variables.
4. Run: python telegram_bot.py
"""

import os
import sys
import json
import urllib.request
import urllib.parse
from datetime import datetime

# CONFIGURATION (Replace with your details)
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "HER_TELEGRAM_CHAT_ID")
WEB_APP_URL = os.environ.get("WEB_APP_URL", "https://your-love-countdown.vercel.app")

WEDDING_DATE = datetime(2027, 5, 16, 6, 0, 0)
ENGAGEMENT_DATE = datetime(2026, 11, 20, 0, 0, 0)

def calculate_countdown():
    now = datetime.now()
    diff = WEDDING_DATE - now
    days_left = max(0, diff.days)
    return days_left

def send_telegram_message():
    days_left = calculate_countdown()
    
    # Romantic bilingual message
    message = (
        f"🌅 *காலை வணக்கம் என் லிசா (Lissa)!* ❤️👰\n\n"
        f"💍 *Leo & Lissa Wedding Countdown:* இன்னும் *{days_left} நாட்கள்* மட்டுமே உள்ளன!\n\n"
        f"💌 *Today's Love Letter:*\n"
        f"இன்றைய ஸ்பெஷல் காதல் குறிப்பைத் திறந்து பார்க்க இங்கே தொடவும்:\n"
        f"👉 [இன்றைய காதல் மடல்]({WEB_APP_URL})\n\n"
        f"May 16 & 17 namma kalyanam... Can't wait to hold your hands forever Lissa! 💖✨\n"
        f"- என்றும் உன் அன்புடன் Leo 🤵"
    )

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": message,
        "parse_mode": "Markdown",
        "disable_web_page_preview": False
    }

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            if result.get("ok"):
                print("✅ Telegram notification sent successfully!")
            else:
                print("❌ Failed:", result)
    except Exception as e:
        print(f"Error sending message: {e}")

if __name__ == "__main__":
    send_telegram_message()
