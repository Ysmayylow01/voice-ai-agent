#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Voice AI Agent - Flask Backend
Multi-language voice command processor with Chrome browser integration and Gmail
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import json
import webbrowser
import subprocess
import platform
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
# EMAIL
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

# =====================
# EMAIL CONFIGURATION
# =====================
# Update these with your Gmail credentials
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD") # UPDATE THIS with your 16-character app password

# =====================
# CONFIGURATION
# =====================

# Vosk models for different languages
VOSK_MODELS = {
    'tk': 'vosk-model-small-tk',  # Turkmen
    'ru': 'vosk-model-small-ru-0.22',  # Russian
    'tr': 'vosk-model-small-tr-0.3',   # Turkish
    'en': 'vosk-model-small-en-us-0.15',  # English
    'uz': 'vosk-model-small-uz-0.22'   # Uzbek
}

# Command keywords for different languages
COMMAND_KEYWORDS = {
    'tk': {
        'youtube': ['youtube', 'ýutub'],
        'google': ['google', 'gözle', 'gözleg', 'qidir'],
        'word': ['word', 'wört'],
        'notepad': ['notepad', 'bloknot'],
        'chrome': ['chrome', 'xrom', 'brauser'],
        'time': ['wagt', 'sagat', 'soat'],
        'stop': ['dur', 'bes et', 'çyk']
    },
    'ru': {
        'youtube': ['youtube', 'ютуб', 'ютюб'],
        'google': ['google', 'гугл', 'найди', 'поиск'],
        'word': ['word', 'ворд'],
        'notepad': ['notepad', 'блокнот'],
        'chrome': ['chrome', 'хром', 'браузер'],
        'time': ['время', 'сколько времени', 'который час'],
        'stop': ['стоп', 'хватит', 'выход']
    },
    'tr': {
        'youtube': ['youtube', 'yutup'],
        'google': ['google', 'ara', 'arama', 'bul'],
        'word': ['word'],
        'notepad': ['notepad', 'not defteri'],
        'chrome': ['chrome', 'tarayıcı'],
        'time': ['saat', 'zaman', 'kaç'],
        'stop': ['dur', 'durdur', 'çık']
    },
    'en': {
        'youtube': ['youtube'],
        'google': ['google', 'search', 'find'],
        'word': ['word'],
        'notepad': ['notepad'],
        'chrome': ['chrome', 'browser'],
        'time': ['time', 'clock', "what's the time"],
        'stop': ['stop', 'quit', 'exit']
    },
    
    'uz': {
        'youtube': ['youtube', 'yutub'],
        'google': ['google', 'qidirish', 'qidir', 'topish'],
        'word': ['word', 'vord'],
        'notepad': ['notepad', 'bloknot', 'daftar'],
        'chrome': ['chrome', 'xrom', 'brauzer'],
        'time': ['vaqt', 'soat', 'necha'],
        'stop': ['toxta', 'toxtash', 'chiqish']
    }
}

# =====================
# EMAIL FUNCTIONS
# =====================

def send_email(to_email, subject, message):
    """
    Send email via Gmail SMTP
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        message: Email body
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = to_email

        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"✅ Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Email error: {e}")
        return False


# =====================
# CHROME BROWSER SETUP
# =====================

def setup_chrome_browser():
    """
    Setup Chrome as the default browser for the application
    Returns the browser controller
    """
    system = platform.system()
    
    try:
        if system == "Windows":
            # Windows Chrome paths
            chrome_paths = [
                r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe")
            ]
            
            for chrome_path in chrome_paths:
                if os.path.exists(chrome_path):
                    webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chrome_path))
                    return webbrowser.get('chrome')
        
        elif system == "Darwin":  # macOS
            chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            if os.path.exists(chrome_path):
                webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(chrome_path))
                return webbrowser.get('chrome')
        
        else:  # Linux
            chrome_commands = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']
            
            for cmd in chrome_commands:
                try:
                    # Check if command exists
                    subprocess.run([cmd, '--version'], capture_output=True, timeout=2)
                    webbrowser.register('chrome', None, webbrowser.BackgroundBrowser(cmd))
                    return webbrowser.get('chrome')
                except:
                    continue
    
    except Exception as e:
        print(f"⚠️ Chrome setup error: {e}")
    
    # Fallback to default browser
    return None


# Initialize Chrome browser controller
CHROME_BROWSER = setup_chrome_browser()

def open_in_chrome(url: str) -> bool:
    """
    Open URL in Chrome browser
    
    Args:
        url: URL to open
        
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        if CHROME_BROWSER:
            CHROME_BROWSER.open(url, new=2)  # new=2 opens in new tab
            return True
        else:
            # Fallback to default browser
            webbrowser.open(url, new=2)
            return True
    except Exception as e:
        print(f"❌ Error opening in Chrome: {e}")
        return False


# =====================
# ROUTES
# =====================

@app.route('/')
def index():
    """Serve the main application page"""
    return render_template('index.html')


@app.route('/execute_command', methods=['POST'])
def execute_command():
    """
    Execute voice command
    
    Expected JSON:
    {
        "command": "youtube aç",
        "language": "tk"
    }
    
    Returns:
    {
        "success": true,
        "action": "youtube",
        "result": "YouTube açyldy"
    }
    """
    try:
        data = request.get_json()
        command = data.get('command', '').lower()
        language = data.get('language', 'tk')
        
        print(f"🤖 Received command: {command} (lang: {language})")
        
        # Get keywords for the current language
        keywords = COMMAND_KEYWORDS.get(language, COMMAND_KEYWORDS['tk'])
        
        # Process command
        result = process_command(command, keywords, language)
        
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/send_email', methods=['POST'])
def send_email_route():
    """
    Send email via Gmail
    
    Expected JSON:
    {
        "to_email": "recipient@example.com",
        "subject": "Email subject",
        "message": "Email message"
    }
    
    Returns:
    {
        "success": true,
        "result": "Email sent"
    }
    """
    try:
        data = request.get_json()
        to_email = data.get('to_email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        print(f"📧 Sending email to: {to_email}")
        print(f"   Subject: {subject}")
        
        # Validate inputs
        if not to_email or not subject or not message:
            return jsonify({
                'success': False,
                'error': 'Missing required fields'
            }), 400
        
        # Send email
        success = send_email(to_email, subject, message)
        
        if success:
            return jsonify({
                'success': True,
                'result': f'Email sent to {to_email}'
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Failed to send email. Check your EMAIL_PASSWORD configuration.'
            }), 500
        
    except Exception as e:
        print(f"❌ Email error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# =====================
# COMMAND PROCESSOR
# =====================

def process_command(command, keywords, language):
    """
    Process voice command
    
    Note: Email commands are now handled by the UI modal
    """
    command = command.lower()

    # YOUTUBE
    if any(kw in command for kw in keywords['youtube']):
        return execute_youtube()

    # GOOGLE
    if any(kw in command for kw in keywords['google']):
        query = extract_search_query(command, keywords['google'])
        return execute_google_search(query)

    # WORD
    if any(kw in command for kw in keywords['word']):
        return execute_word()

    # NOTEPAD
    if any(kw in command for kw in keywords['notepad']):
        return execute_notepad()

    # CHROME
    if any(kw in command for kw in keywords['chrome']):
        return execute_chrome()

    # TIME
    if any(kw in command for kw in keywords['time']):
        return execute_time(language)

    return {
        'success': False,
        'result': 'unknown command'
    }


# =====================
# UTILITY FUNCTIONS
# =====================

def extract_search_query(command: str, google_keywords: list) -> str:
    """
    Extract search query from command
    
    Args:
        command: Full voice command
        google_keywords: List of Google-related keywords
    
    Returns:
        Cleaned search query
    """
    query = command
    
    # Remove Google keywords
    for keyword in google_keywords:
        query = query.replace(keyword, '')
    
    # Remove common action words
    action_words = ['aç', 'open', 'açyň', 'открой', 'открыть', 'бул', 'ara', 'och', 'açar']
    for word in action_words:
        query = query.replace(word, '')
    
    return query.strip()


# =====================
# COMMAND EXECUTORS
# =====================

def execute_youtube() -> dict:
    """Open YouTube in Chrome"""
    try:
        print("▶ Opening YouTube in Chrome...")
        success = open_in_chrome("https://www.youtube.com")
        
        return {
            'success': success,
            'action': 'youtube',
            'result': 'YouTube opened in Chrome'
        }
    except Exception as e:
        return {
            'success': False,
            'action': 'youtube',
            'error': str(e)
        }


def execute_google_search(query: str) -> dict:
    """Execute Google search in Chrome"""
    try:
        print(f"🔎 Google search in Chrome: {query}")
        search_url = f"https://www.google.com/search?q={query}"
        success = open_in_chrome(search_url)
        
        return {
            'success': success,
            'action': 'google',
            'result': f'Searched: {query} in Chrome'
        }
    except Exception as e:
        return {
            'success': False,
            'action': 'google',
            'error': str(e)
        }


def execute_word() -> dict:
    """Open Microsoft Word"""
    try:
        print("📄 Opening Word...")
        system = platform.system()
        
        if system == "Windows":
            # Try multiple methods for Windows
            try:
                os.startfile("winword")
            except:
                subprocess.Popen(["start", "winword.exe"], shell=True)
        elif system == "Darwin":  # macOS
            subprocess.Popen(["open", "-a", "Microsoft Word"])
        else:  # Linux
            subprocess.Popen(["libreoffice", "--writer"])
        
        return {
            'success': True,
            'action': 'word',
            'result': 'Word opened'
        }
    except Exception as e:
        return {
            'success': False,
            'action': 'word',
            'error': str(e)
        }


def execute_notepad() -> dict:
    """Open Notepad"""
    try:
        print("📝 Opening Notepad...")
        system = platform.system()
        
        if system == "Windows":
            os.startfile("notepad")
        elif system == "Darwin":  # macOS
            subprocess.Popen(["open", "-a", "TextEdit"])
        else:  # Linux
            # Try multiple text editors
            editors = ['gedit', 'kate', 'geany', 'mousepad', 'leafpad']
            for editor in editors:
                try:
                    subprocess.Popen([editor])
                    break
                except:
                    continue
        
        return {
            'success': True,
            'action': 'notepad',
            'result': 'Notepad opened'
        }
    except Exception as e:
        return {
            'success': False,
            'action': 'notepad',
            'error': str(e)
        }


def execute_chrome() -> dict:
    """Open Chrome browser"""
    try:
        print("🌐 Opening Chrome...")
        success = open_in_chrome("https://www.google.com")
        
        return {
            'success': success,
            'action': 'chrome',
            'result': 'Chrome opened'
        }
    except Exception as e:
        return {
            'success': False,
            'action': 'chrome',
            'error': str(e)
        }


def execute_time(language: str) -> dict:
    """Get current time"""
    try:
        now = datetime.now()
        time_str = now.strftime("%H:%M")
        
        # Language-specific time format
        time_messages = {
            'tk': f'⏰ Häzirki wagt: {time_str}',
            'ru': f'⏰ Текущее время: {time_str}',
            'tr': f'⏰ Şu anki saat: {time_str}',
            'en': f'⏰ Current time: {time_str}',
            'uz': f'⏰ Hozirgi vaqt: {time_str}'
        }
        
        message = time_messages.get(language, time_messages['tk'])
        print(message)
        
        return {
            'success': True,
            'action': 'time',
            'result': message
        }
    except Exception as e:
        return {
            'success': False,
            'action': 'time',
            'error': str(e)
        }


# =====================
# MAIN
# =====================

if __name__ == '__main__':
    print("=" * 50)
    print("🎙 Voice AI Agent - Flask Server")
    print("=" * 50)
    
    # Display Chrome browser status
    if CHROME_BROWSER:
        print("✅ Chrome browser configured successfully")
    else:
        print("⚠️  Chrome not found, using default browser")
    
    # Check email configuration
    if EMAIL_PASSWORD == "your-app-password-here":
        print("⚠️  Email not configured - update EMAIL_PASSWORD in app.py")
    else:
        print(f"✅ Email configured: {EMAIL_USER}")
    
    print("📡 Server starting...")
    print("🌐 Access at: http://localhost:5000")
    print("=" * 50)
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )