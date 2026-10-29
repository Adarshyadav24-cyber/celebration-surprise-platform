# ✦ 3D Celebration, Love & Surprise Platform ✦
> A modern full-stack web platform for crafting personalized, interactive 3D celebrations, anniversaries, Valentine's surprises, and life milestones.

---

## 🌟 Overview & Key Highlights

The **3D Celebration, Love & Surprise Platform** transforms traditional digital greetings into unforgettable, interactive 3D spatial experiences. Built with a pure Node.js backend (zero external npm dependencies) and cutting-edge vanilla HTML5/CSS3 3D transforms, the platform allows senders to customize and share personalized surprises across **81 distinct occasions** spanning 7 major celebration categories.

### ✨ Key Features

1. **Private Celebration Studio (`admin.html`)**:
   - Modern glassmorphism interface with category filter pills.
   - 81 occasion cards with instant live search and visual categorization.
   - Context-aware relationship selectors (e.g. Sister, Mother, Best Friend, Dear Special Person, etc.).
   - Multilingual content engine with synchronized presets in **English**, **Hindi**, and **Hinglish**.
   - Drag-and-drop multi-photo uploader with instant previews, cover selection, and deletion controls.
   - Categorized music library with live in-studio audio preview.
   - Instant shareable link generation (`/4thday.html?id=...`), one-click clipboard copying, and direct WhatsApp sharing.
   - Celebration Management table to inspect and copy previously created celebrations.

2. **Recipient 3D Celebration Frontend (`4thday.html`)**:
   - **Zero Admin Controls**: A pure, immersive gift experience with no forms or edit buttons visible to the recipient.
   - **Dynamic Theming Engine**: Automatically adapts background radial gradients, neon glows, and custom typography to match the selected occasion and relationship.
   - **Strict Relationship Isolation**:
     - The phrase `"For Beautiful Soul 💖"` appears **only** when `Dear Special Person` or romantic/love occasions are selected.
     - Family celebrations prominently celebrate the exact relationship (e.g., `Celebrating Our Precious Sister`), with zero accidental "Brother" leaks.
   - **Floating Audio Suite**:
     - Plays the selected audio track with animated soundwave visualizer bars and track title.
     - Fallback procedural synthesizer powered by the Web Audio API for smooth playback under strict browser autoplay policies.
   - **Interactive 3D Celebration Activities**:
     1. 🎂 **Interactive Cake Cutting**: Multi-tier 3D cake, blowable candles with flame physics, draggable/clickable golden knife, slice cleanly separating onto a dessert plate with confetti cannons and celebratory toasts.
     2. 🌹 **3D Blooming Rose**: Procedural layered rose bud with velvet petals that unfurl and bloom upon touch with dewdrops and romantic quotes.
     3. 💍 **Velvet Ring Box**: 3D jewelry case with golden clasp that opens in 3D perspective to reveal a sparkling diamond ring with radiant light rays.
     4. 🍫 **Artisanal Chocolates**: Gourmet chocolate box with dark truffles, caramel swirls, ruby strawberries, and velvet cocoa that unwrap upon click to reveal sweet compliments.
     5. 🧸 **Cuddly Teddy Hug**: Animated 3D plush teddy bear that embraces with warm cuddles, vibrating hearts, and comforting messages.
     6. 📜 **Royal Promise Scrolls**: Antique wax-sealed parchment scroll that rolls downwards revealing sacred lifelong promises.
     7. ✨ **Golden Scratch Card**: Interactive HTML5 Canvas scratch foil with metallic gold glitter that reveals secret blessings upon scratching with pointer or finger.
     8. 💌 **Wax-Sealed Love Letter**: 3D parchment envelope with folding flap and sliding love letter.
   - **Advanced Multi-Presentation Photo Gallery**:
     - 🎠 **3D Cylinder Carousel**: Revolving 3D ring with perspective depth, prev/next arrows, and click-to-zoom lightbox.
     - 📸 **Vintage Polaroids**: Scattered polaroids on a glass slate with paper texture, tilt angles, and handwritten captions.
     - ⏳ **Memory Journey Timeline**: Vertical milestone timeline with glowing nodes and memory cards.
     - 📖 **3D Photo Album**: Hardcover keepsake book with flipping page layout.

3. **High-Performance Pure Node.js Backend (`server.js`)**:
   - Zero npm dependencies (`http`, `fs`, `path`, `url`, `crypto`).
   - High-throughput static file streaming with proper MIME types.
   - Automatic base64-to-disk image persistence inside `uploads/`.
   - Thread-safe JSON database storage inside `data/celebrations.json`.
   - RESTful API endpoints for catalog, music, and celebration records.

---

## 📁 Project Directory Structure

```
c:\Users\ay351\OneDrive\Desktop\Celebration-Surprise-Platform\
├── audio\
│   ├── celebration-party.wav     # Upbeat festival anthem (16-bit PCM WAV)
│   ├── festive-bells.wav         # Golden festive illumination (16-bit PCM WAV)
│   ├── friendship-chimes.wav     # Playful crystal chimes (16-bit PCM WAV)
│   ├── gentle-piano.wav          # Warm, grateful acoustic piano & harp (16-bit PCM WAV)
│   └── romantic-melody.wav       # Harmonic acoustic love serenade (16-bit PCM WAV)
├── data\
│   └── celebrations.json         # Persistent JSON database for generated surprises
├── uploads\                      # Saved recipient photo uploads (<id>-<index>.<ext>)
├── .env.example                  # Environment configuration template
├── 4thday.html                   # Main Recipient 3D Celebration Experience
├── admin.html                    # Private Celebration & Surprise Studio
├── catalog.js                    # 81-Occasion Master Catalog, Themes & Music Library
├── happy-birthday.wav            # Celestial music box audio asset
├── README.md                     # Comprehensive documentation & deployment guide
└── server.js                     # Zero-dependency Node.js HTTP backend server
```

---

## 🚀 Getting Started & Local Run

### Prerequisites
- Node.js (version 16 or newer). No `npm install` is required!

### 1. Launching the Backend Server
Open PowerShell in the project directory:

```powershell
cd "c:\Users\ay351\OneDrive\Desktop\Celebration-Surprise-Platform"
node server.js
```

The server will start on port `8000`:
- **Studio Dashboard**: [http://localhost:8000/admin.html](http://localhost:8000/admin.html)
- **Recipient Experience**: [http://localhost:8000/4thday.html](http://localhost:8000/4thday.html)

---

## 🌐 API Specification

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server uptime and health check |
| `GET` | `/api/catalog` | Master occasion catalog (7 categories, 81 occasions) |
| `GET` | `/api/music` | Music library catalog with duration & audio URLs |
| `GET` | `/api/celebrations` | List all saved celebration records (for studio dashboard) |
| `GET` | `/api/celebrations/:id` | Fetch complete celebration payload by unique ID |
| `POST` | `/api/celebrations` | Create a new celebration surprise & persist photos |
| `DELETE` | `/api/celebrations/:id` | Remove a celebration record |
| `POST` | `/api/admin/auth` | Verify admin passcode |

---

## ☁️ Deployment Instructions

Because the project relies on **pure Node.js built-ins without external npm packages**, deploying to modern cloud providers is instantaneous.

### Deploying to Render
1. Create a new Web Service on [Render](https://render.com).
2. Connect your repository.
3. Build Command: *(leave blank or `echo "No build needed"`)*.
4. Start Command: `node server.js`.
5. Environment Variables:
   - `PORT`: `8000` (or leave default assigned by Render)
   - `ADMIN_PASSCODE`: `your_secure_password`

### Deploying to Railway
1. Create a new project on [Railway](https://railway.app).
2. Deploy from GitHub or local CLI (`railway up`).
3. Railway automatically detects `server.js` and launches `node server.js`.

### Deploying to Vercel / Netlify
- For serverless deployments, you can expose `server.js` as an edge/serverless handler or deploy `admin.html`, `4thday.html`, and `catalog.js` as static sites with a hosted backend.

---

## 🎨 Occasion Categories Covered

1. **🎂 Birthday Celebrations (12 Occasions)**: General Birthday, Best Friend, Family, Brother, Sister, Mother, Father, Child, Partner, Special Person, Belated, Countdown.
2. **💍 Wedding & Anniversaries (11 Occasions)**: Marriage Anniversary, 1st Wedding, Silver Jubilee (25 Yrs), Golden Jubilee (50 Yrs), Relationship, Dating, First Meeting, First Date, Proposal, Engagement, Long Distance.
3. **🌹 Valentine's Week (All 8 Days)**: Rose Day (Feb 7), Propose Day (Feb 8), Chocolate Day (Feb 9), Teddy Day (Feb 10), Promise Day (Feb 11), Hug Day (Feb 12), Kiss Day (Feb 13), Valentine's Day (Feb 14).
4. **💖 Love & Romance (14 Occasions)**: Love Anniversary, Crush Appreciation, Just Because, First Love Memory, Long-Distance Love, Missing You, Apology/Sorry, Make-Up Surprise, Thank You My Love, Good Morning, Good Night, Cherished Memories, Personal Love Letter, Date Invitation.
5. **🎉 Friendship Days (7 Occasions)**: Friendship Day, Best Friend Appreciation, Friends Forever, Friendship Anniversary, Thank You Bestie, Missing My Friend, Surprise.
6. **👨‍👩‍👧 Family Appreciation (9 Occasions)**: Mother's Day, Father's Day, Parents' Anniversary, Parents' Appreciation, Siblings Day, Brother Appreciation, Sister Appreciation, Grandparents' Day, Family Thank You.
7. **✨ Festivals & Milestones (20 Occasions)**: Graduation, Exam Success, New Job, Promotion, Achievement, Welcome Home, Farewell, Retirement, New Year, Christmas, Diwali, Holi, Eid Mubarak, Raksha Bandhan, Bhai Dooj, Teacher Appreciation, Heartfelt Thank You, Congratulations, Get Well Soon, Just For You.

#   c e l e b r a t i o n - s u r p r i s e - p l a t f o r m  
 