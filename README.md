# 🎙️ Voice AI Agent - Professional Edition

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![Flask](https://img.shields.io/badge/flask-3.0.0-red)

**Sesden iş akymyna - AI tarapyndan goldanýar**

Professional blurry dizaýnda, köp dilli goldaw bilen Voice to Workflow AI Agent. 4 dili goldaýar: Türkmençe, Rusça, Türkçe, Iňlisçe.

## ✨ Aýratynlyklar

### 🎨 Dizaýn
- **Blurry Gradient Effects** - Professional blur we gradient dizaýny
- **Responsive Design** - Ähli enjamlar üçin optimizasiýa
- **Dark Theme** - Göz üçin rahat, modern görünüş
- **Animated UI** - Interaktiw animasiýalar we geçişler
- **Glass Morphism** - Häzirki zaman glassmorphism effektleri

### 🌍 Köp Dilli Goldaw
- 🇹🇲 **Türkmençe** (vosk-model-small-tk-0.22)
- 🇷🇺 **Русский** (vosk-model-small-ru-0.22)
- 🇹🇷 **Türkçe** (vosk-model-small-tr-0.3)
- 🇺🇸 **English** (vosk-model-small-en-us-0.15)
- 🇺🇿 **O'zbekcha** (vosk-model-small-uz-0.22)

### 🎯 Elýeterli Buýruklar

#### Türkmençe
```
youtube aç          → YouTube açýar
google gözle ...    → Google gözleg
word aç             → Microsoft Word açýar
notepad aç          → Notepad açýar
xrom aç             → Chrome brauzer açýar
häzirki wagt        → Häzirki wagty görkezýär
```

#### Русский
```
открой youtube      → Открывает YouTube
найди в google ...  → Поиск в Google
открой word         → Открывает Microsoft Word
открой блокнот      → Открывает блокнот
открой chrome       → Открывает Chrome
который час         → Показывает текущее время
```

#### Türkçe
```
youtube aç          → YouTube'u açar
google ara ...      → Google'da arama yapar
word aç             → Microsoft Word'ü açar
not defteri aç      → Not defterini açar
chrome aç           → Chrome tarayıcıyı açar
saat kaç            → Şu anki saati gösterir
```

#### English
```
open youtube        → Opens YouTube
search google ...   → Google search
open word           → Opens Microsoft Word
open notepad        → Opens Notepad
open chrome         → Opens Chrome browser
what's the time     → Shows current time
```

#### O'zbekcha
```
youtube och         → YouTube ni ochadi
google qidir ...    → Google da qidirish
word och            → Microsoft Word ni ochadi
bloknot och         → Bloknotni ochadi
chrome och          → Chrome brauzerini ochadi
vaqt necha          → Hozirgi vaqtni ko'rsatadi
```

## 📦 Gurnamak

### 1. Talap edýän programmalar

```bash
# Python 3.8 ýa-da ýokary wersiýa
python --version

# pip paket dolandyryjysy
pip --version
```

### 2. Repositoriýany klonlamak

```bash
git clone https://github.com/yourusername/voice-ai-agent.git
cd voice-ai-agent
```

### 3. Virtual environment döretmek (maslahat berilýär)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### 4. Gerekli paketleri gurmak

```bash
pip install -r requirements.txt
```

## 🚀 Ulanmak

### 1. Flask serweri işe girizýäris

```bash
python app.py
```

Server şu salgyda açylar: `http://localhost:5000`

### 2. Brauzerde açmak

Brauzeriňizde şu salga açyň:
```
http://localhost:5000
```

### 3. Dil saýlamak

Sag ýokarky burçda dil düwmelerinden birini saýlaň:
- 🇹🇲 Türkmençe
- 🇷🇺 Русский
- 🇹🇷 Türkçe
- 🇺🇸 English
- 🇺🇿 O'zbekcha

### 4. Ses ýazuwy başlamak

1. **"Başla"** düwmesine basyň
2. Mikrofoňyza gürläň
3. Sizin sesiňiz tanalyp, buýruk ýerine ýetirilýär
4. **"Dur"** düwmesi bilen saklaň

## 📁 Faýl gurluşy

```
voice-ai-agent/
│
├── app.py                          # Flask backend
├── requirements.txt                # Python dependencies
├── README.md                       # Bu faýl
│
├── templates/
│   └── index.html                  # Esasy HTML sahypa
│
└── static/
    ├── css/
    │   └── style.css              # Professional blurry dizaýn
    └── js/
        ├── translations.js         # Köp dilli terjimeler
        └── app.js                  # Frontend logic
```

## 🎨 Dizaýn Aýratynlyklary

### Reňk Shemasy
```css
--primary-cyan: #00f5ff      /* Gök-mawy */
--primary-purple: #7b2ff7    /* Gyrmyzy-gök */
--primary-pink: #ff006e      /* Gülgüne */
--primary-orange: #ff8500    /* Mämişi */
```

### Blur Effektleri
- **Arka fon blur**: 80px
- **Glassmorphism**: backdrop-filter blur(30px)
- **Gradient circles**: Animated floating effects

### Animasiýalar
- Fade in/out transitions
- Slide animations
- Pulse effects
- Wave visualizer
- 3D rotations

## 🔧 Sazlamalar

### Port üýtgetmek

`app.py` faýlynda:
```python
app.run(
    host='0.0.0.0',
    port=5000,  # Bu ýerde port nomerini üýtgediň
    debug=True
)
```

### Model üýtgetmek

`app.py` faýlynda `VOSK_MODELS` sözlügini üýtgediň:
```python
VOSK_MODELS = {
    'tk': 'vosk-model-small-tk-0.22',
    # Başga modelleri goşuň
}
```

## 🌐 Brauzer goldawy

Web Speech API goldaýan brauzerlerde işleýär:
- ✅ Google Chrome (maslahat berilýär)
- ✅ Microsoft Edge
- ✅ Safari
- ✅ Opera
- ❌ Firefox (çäkli goldaw)

## 🐛 Meseleler we çözgütler

### Mikrofon işlemeýär
1. Brauzer sazlamalarynda mikrofon rugsatyny barlaň
2. HTTPS ýa-da localhost ulanýandygyňyzy barlaň
3. Başga programmalaryň mikrofony ulanmaýandygyny barlaň

### Ses tanalmady
1. Mikrofoň sesiniň gatylygy barlaň
2. Dogry dil saýlanandygyny barlaň
3. Aýdyň we ýawaş gürläň

### Server açylmaýar
1. Port 5000-iň boşdugyny barlaň
2. Virtual environment işjeňleşdirilendigi barlaň
3. Ähli paketler gurlanandygyny barlaň

## 🔐 Howpsuzlyk

- ⚠️ Bu ýerli web programmasy
- ⚠️ Internet baglanyşygy talap edýär (Web Speech API)
- ⚠️ Sesler brauzer tarapyndan işlenilýär
- ✅ Hiç hili ses databazada saklanmaýar

## 📝 Lisenziya

MIT License - erkin ulanyň we üýtgediň!

## 👨‍💻 Dörediji

**Merdan**
- Oguz Han Engineering and Technology University of Turkmenistan
- Computer Science Student

## 🤝 Goşant

Goşant goşmak isleseňiz:
1. Fork ediň
2. Feature branch dörediň (`git checkout -b feature/AmazingFeature`)
3. Commit ediň (`git commit -m 'Add some AmazingFeature'`)
4. Push ediň (`git push origin feature/AmazingFeature`)
5. Pull Request açyň

## 📧 Habarlaşmak

Soraglar ýa-da teklipler üçin habarlaşyň!

---

**© 2025 Voice AI Agent | Powered by Merdan Ysmayylow**

Made with ❤️ in Turkmenistan 🇹🇲