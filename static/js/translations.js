// ===========================
// MULTILINGUAL TRANSLATIONS
// ===========================

const translations = {
    tk: {
        // Turkmen
        title: "Voice AI Agent",
        subtitle: "Sesden iş akymyna - AI tarapyndan goldanýar",
        status_ready: "Taýýar",
        status_listening: "Diňleýär...",
        status_processing: "Işleýär...",
        model_label: "Model:",
        btn_start: "Başla",
        btn_stop: "Dur",
        transcript_title: "Ses Ýazgysy",
        transcript_placeholder: "Siz gürleýänçä, tekst şu ýerde görkeziler...",
        commands_title: "Elýeterli buýruklar",
        cmd_youtube: "YouTube",
        cmd_google: "Google Gözleg",
        cmd_word: "Word",
        cmd_chrome: "Chrome",
        cmd_notepad: "Notepad",
        cmd_time: "Wagt",
        cmd_email: "Gmail",
        activity_title: "Işler ýurnaly",
        activity_placeholder: "Işler şu ýerde görkeziler...",
        footer_powered: "Goldanýar:",
        
        // Activity messages
        activity_youtube: "YouTube açyldy",
        activity_google: "Google gözleg ýerine ýetirildi",
        activity_word: "Word açyldy",
        activity_chrome: "Chrome açyldy",
        activity_notepad: "Notepad açyldy",
        activity_time: "Wagt soraldy",
        activity_email: "Gmail açyldy",
        activity_email_sent: "Email iberildi",
        activity_unknown: "Buýruk tanalmady",
        activity_recognized: "Tanalan tekst:",
        
        // Notifications
        notif_started: "Ses ýazuw başlandy",
        notif_stopped: "Ses ýazuw togtatyldy",
        notif_error: "Säwlik ýüze çykdy",
        notif_no_mic: "Mikrofon elýeterli däl",
        
        // Permissions
        permission_title: "Mikrofon rugsady gerek",
        permission_desc: "Ses tanama işlemek üçin mikrofonyňyza rugsat beriň",
        permission_grant: "Rugsat ber",
        permission_denied: "Mikrofon rugsady ret edildi",
        permission_checking: "Mikrofon barlanýar...",
        
        // Email modal
        email_modal_title: "Email Iber",
        email_to_label: "Kime:",
        email_subject_label: "Tema:",
        email_message_label: "Habar:",
        email_subject_placeholder: "Email temasy",
        email_message_placeholder: "Habaryňyzy ýazyň...",
        email_cancel: "Ýatyr",
        email_send: "Iber",
        voice_listening: "Diňleýärin..."
    },
    
    ru: {
        // Russian
        title: "Voice AI Agent",
        subtitle: "От голоса к рабочему процессу - на базе ИИ",
        status_ready: "Готов",
        status_listening: "Слушаю...",
        status_processing: "Обработка...",
        model_label: "Модель:",
        btn_start: "Начать",
        btn_stop: "Стоп",
        transcript_title: "Расшифровка",
        transcript_placeholder: "Ваша речь будет отображаться здесь...",
        commands_title: "Доступные команды",
        cmd_youtube: "YouTube",
        cmd_google: "Поиск Google",
        cmd_word: "Word",
        cmd_chrome: "Chrome",
        cmd_notepad: "Блокнот",
        cmd_time: "Время",
        cmd_email: "Gmail",
        activity_title: "Журнал действий",
        activity_placeholder: "Действия будут отображаться здесь...",
        footer_powered: "Работает на:",
        
        // Activity messages
        activity_youtube: "YouTube открыт",
        activity_google: "Выполнен поиск в Google",
        activity_word: "Word открыт",
        activity_chrome: "Chrome открыт",
        activity_notepad: "Блокнот открыт",
        activity_time: "Запрошено время",
        activity_email: "Gmail открыт",
        activity_email_sent: "Email отправлен",
        activity_unknown: "Команда не распознана",
        activity_recognized: "Распознанный текст:",
        
        // Notifications
        notif_started: "Запись голоса начата",
        notif_stopped: "Запись голоса остановлена",
        notif_error: "Произошла ошибка",
        notif_no_mic: "Микрофон недоступен",
        
        // Permissions
        permission_title: "Требуется разрешение микрофона",
        permission_desc: "Предоставьте доступ к микрофону для работы распознавания речи",
        permission_grant: "Разрешить",
        permission_denied: "Доступ к микрофону отклонен",
        permission_checking: "Проверка микрофона...",
        
        // Email modal
        email_modal_title: "Отправить Email",
        email_to_label: "Кому:",
        email_subject_label: "Тема:",
        email_message_label: "Сообщение:",
        email_subject_placeholder: "Тема письма",
        email_message_placeholder: "Напишите ваше сообщение...",
        email_cancel: "Отмена",
        email_send: "Отправить",
        voice_listening: "Слушаю..."
    },
    
    tr: {
        // Turkish
        title: "Voice AI Agent",
        subtitle: "Sesten iş akışına - AI destekli",
        status_ready: "Hazır",
        status_listening: "Dinliyor...",
        status_processing: "İşleniyor...",
        model_label: "Model:",
        btn_start: "Başla",
        btn_stop: "Durdur",
        transcript_title: "Ses Kaydı",
        transcript_placeholder: "Konuştuğunuzda metin burada görünecek...",
        commands_title: "Kullanılabilir Komutlar",
        cmd_youtube: "YouTube",
        cmd_google: "Google Arama",
        cmd_word: "Word",
        cmd_chrome: "Chrome",
        cmd_notepad: "Not Defteri",
        cmd_time: "Saat",
        cmd_email: "Gmail",
        activity_title: "Aktivite Günlüğü",
        activity_placeholder: "Aktiviteler burada görünecek...",
        footer_powered: "Destekleyen:",
        
        // Activity messages
        activity_youtube: "YouTube açıldı",
        activity_google: "Google araması yapıldı",
        activity_word: "Word açıldı",
        activity_chrome: "Chrome açıldı",
        activity_notepad: "Not Defteri açıldı",
        activity_time: "Saat soruldu",
        activity_email: "Gmail açıldı",
        activity_email_sent: "Email gönderildi",
        activity_unknown: "Komut tanınmadı",
        activity_recognized: "Tanınan metin:",
        
        // Notifications
        notif_started: "Ses kaydı başladı",
        notif_stopped: "Ses kaydı durduruldu",
        notif_error: "Bir hata oluştu",
        notif_no_mic: "Mikrofon kullanılamıyor",
        
        // Permissions
        permission_title: "Mikrofon izni gerekli",
        permission_desc: "Ses tanıma için mikrofonunuza erişim izni verin",
        permission_grant: "İzin Ver",
        permission_denied: "Mikrofon izni reddedildi",
        permission_checking: "Mikrofon kontrol ediliyor...",
        
        // Email modal
        email_modal_title: "Email Gönder",
        email_to_label: "Kime:",
        email_subject_label: "Konu:",
        email_message_label: "Mesaj:",
        email_subject_placeholder: "Email konusu",
        email_message_placeholder: "Mesajınızı yazın...",
        email_cancel: "İptal",
        email_send: "Gönder",
        voice_listening: "Dinliyorum..."
    },
    
    en: {
        // English
        title: "Voice AI Agent",
        subtitle: "Voice to Workflow - AI Powered",
        status_ready: "Ready",
        status_listening: "Listening...",
        status_processing: "Processing...",
        model_label: "Model:",
        btn_start: "Start",
        btn_stop: "Stop",
        transcript_title: "Transcript",
        transcript_placeholder: "Your speech will appear here...",
        commands_title: "Available Commands",
        cmd_youtube: "YouTube",
        cmd_google: "Google Search",
        cmd_word: "Word",
        cmd_chrome: "Chrome",
        cmd_notepad: "Notepad",
        cmd_time: "Time",
        cmd_email: "Gmail",
        activity_title: "Activity Log",
        activity_placeholder: "Activities will appear here...",
        footer_powered: "Powered by:",
        
        // Activity messages
        activity_youtube: "YouTube opened",
        activity_google: "Google search performed",
        activity_word: "Word opened",
        activity_chrome: "Chrome opened",
        activity_notepad: "Notepad opened",
        activity_time: "Time requested",
        activity_email: "Gmail opened",
        activity_email_sent: "Email sent",
        activity_unknown: "Command not recognized",
        activity_recognized: "Recognized text:",
        
        // Notifications
        notif_started: "Voice recording started",
        notif_stopped: "Voice recording stopped",
        notif_error: "An error occurred",
        notif_no_mic: "Microphone not available",
        
        // Permissions
        permission_title: "Microphone Permission Required",
        permission_desc: "Please grant microphone access for voice recognition to work",
        permission_grant: "Grant Permission",
        permission_denied: "Microphone permission denied",
        permission_checking: "Checking microphone...",
        
        // Email modal
        email_modal_title: "Send Email",
        email_to_label: "To:",
        email_subject_label: "Subject:",
        email_message_label: "Message:",
        email_subject_placeholder: "Email subject",
        email_message_placeholder: "Write your message...",
        email_cancel: "Cancel",
        email_send: "Send",
        voice_listening: "Listening..."
    },
    
    uz: {
        // Uzbek
        title: "Voice AI Agent",
        subtitle: "Ovozdan ish jarayoniga - AI tomonidan qo'llab-quvvatlanadi",
        status_ready: "Tayyor",
        status_listening: "Tinglamoqda...",
        status_processing: "Qayta ishlanmoqda...",
        model_label: "Model:",
        btn_start: "Boshlash",
        btn_stop: "To'xtatish",
        transcript_title: "Ovoz yozuvi",
        transcript_placeholder: "Gapirganingizda matn bu yerda ko'rinadi...",
        commands_title: "Mavjud buyruqlar",
        cmd_youtube: "YouTube",
        cmd_google: "Google qidiruvi",
        cmd_word: "Word",
        cmd_chrome: "Chrome",
        cmd_notepad: "Bloknotni",
        cmd_time: "Vaqt",
        cmd_email: "Gmail",
        activity_title: "Faoliyat jurnali",
        activity_placeholder: "Faoliyatlar bu yerda ko'rinadi...",
        footer_powered: "Qo'llab-quvvatlaydi:",
        
        // Activity messages
        activity_youtube: "YouTube ochildi",
        activity_google: "Google qidiruvi bajarildi",
        activity_word: "Word ochildi",
        activity_chrome: "Chrome ochildi",
        activity_notepad: "Bloknotni ochildi",
        activity_time: "Vaqt so'raldi",
        activity_email: "Gmail ochildi",
        activity_email_sent: "Email yuborildi",
        activity_unknown: "Buyruq tanilmadi",
        activity_recognized: "Tanilgan matn:",
        
        // Notifications
        notif_started: "Ovoz yozish boshlandi",
        notif_stopped: "Ovoz yozish to'xtatildi",
        notif_error: "Xatolik yuz berdi",
        notif_no_mic: "Mikrofon mavjud emas",
        
        // Permissions
        permission_title: "Mikrofon ruxsati kerak",
        permission_desc: "Ovoz tanish ishlashi uchun mikrofoningizga ruxsat bering",
        permission_grant: "Ruxsat berish",
        permission_denied: "Mikrofon ruxsati rad etildi",
        permission_checking: "Mikrofon tekshirilmoqda...",
        
        // Email modal
        email_modal_title: "Email Yuborish",
        email_to_label: "Kimga:",
        email_subject_label: "Mavzu:",
        email_message_label: "Xabar:",
        email_subject_placeholder: "Email mavzusi",
        email_message_placeholder: "Xabaringizni yozing...",
        email_cancel: "Bekor qilish",
        email_send: "Yuborish",
        voice_listening: "Tinglamoqda..."
    }
};

// ===========================
// LANGUAGE SWITCHING
// ===========================

let currentLang = 'tk'; // Default language

function switchLanguage(lang) {
    currentLang = lang;
    
    // Save to localStorage
    localStorage.setItem('voiceAgentLang', lang);
    
    // Update all text elements
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update model name based on language
    updateModelName(lang);
}

function updateModelName(lang) {
    const modelElement = document.getElementById('modelName');
    const modelMap = {
        'tk': 'vosk-model-small-tk-0.22',
        'ru': 'vosk-model-small-ru-0.22',
        'tr': 'vosk-model-small-tr-0.3',
        'en': 'vosk-model-small-en-us-0.15',
        'uz': 'vosk-model-small-uz-0.22'
    };
    
    if (modelElement && modelMap[lang]) {
        modelElement.textContent = modelMap[lang];
    }
}

function getText(key) {
    return translations[currentLang][key] || key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language or use default
    const savedLang = localStorage.getItem('voiceAgentLang') || 'tk';
    switchLanguage(savedLang);
    
    // Add language button listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});