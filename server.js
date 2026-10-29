/**
 * ✦ CELEBRATION SURPRISE PLATFORM BACKEND SERVER ✦
 * Pure Node.js HTTP Server with zero external npm dependencies.
 * Powers the 3D Celebration Platform with full-stack APIs, multi-photo storage,
 * catalog endpoints, and persistent celebration records.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const { OCCASION_CATEGORIES, MUSIC_LIBRARY, getOccasionConfig } = require('./catalog.js');

const PORT = process.env.PORT || 8000;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'celebrate2026';
const ROOT_DIR = __dirname;
const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL ? path.join('/tmp', 'data') : path.join(ROOT_DIR, 'data');
const UPLOADS_DIR = IS_VERCEL ? path.join('/tmp', 'uploads') : path.join(ROOT_DIR, 'uploads');
const AUDIO_DIR = path.join(ROOT_DIR, 'audio');
const DB_FILE = path.join(DATA_DIR, 'celebrations.json');

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR, AUDIO_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {}
  }
});

if (IS_VERCEL && !fs.existsSync(DB_FILE)) {
  const seedFile = path.join(ROOT_DIR, 'data', 'celebrations.json');
  if (fs.existsSync(seedFile)) {
    try { fs.copyFileSync(seedFile, DB_FILE); } catch (e) {}
  }
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf8');
}

// Database helper functions
function readCelebrations() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading celebrations database:', err);
    return {};
  }
}

function writeCelebrations(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing celebrations database:', err);
    return false;
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Process and save multiple base64 images
function processPhotoGallery(photosArray, celebrationId) {
  if (!Array.isArray(photosArray)) return [];
  const processed = [];

  photosArray.forEach((photoObj, idx) => {
    let dataUrl = typeof photoObj === 'string' ? photoObj : photoObj.url;
    let caption = (photoObj && photoObj.caption) || '';
    let date = (photoObj && photoObj.date) || '';
    let isCover = (photoObj && photoObj.isCover) || (idx === 0);

    if (dataUrl && dataUrl.startsWith('data:image/')) {
      try {
        const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (matches) {
          let ext = matches[1].toLowerCase();
          if (ext === 'jpeg') ext = 'jpg';
          const buffer = Buffer.from(matches[2], 'base64');
          const filename = `${celebrationId}-${idx + 1}.${ext}`;
          const filePath = path.join(UPLOADS_DIR, filename);
          fs.writeFileSync(filePath, buffer);
          processed.push({
            id: `p-${idx + 1}`,
            url: `/uploads/${filename}`,
            caption,
            date,
            isCover
          });
          return;
        }
      } catch (err) {
        console.error(`Error saving photo ${idx + 1}:`, err);
      }
    }

    if (dataUrl) {
      processed.push({
        id: `p-${idx + 1}`,
        url: dataUrl,
        caption,
        date,
        isCover
      });
    }
  });

  return processed;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method.toUpperCase();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Passcode');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Health Check
  if (pathname === '/api/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', serverTime: new Date().toISOString() }));
    return;
  }

  // API: Get Occasion Catalog & Music Library
  if (pathname === '/api/catalog' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      categories: OCCASION_CATEGORIES,
      music: MUSIC_LIBRARY
    }));
    return;
  }

  // API: Get Music Library
  if (pathname === '/api/music' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, music: MUSIC_LIBRARY }));
    return;
  }

  // API: Admin Authentication
  if (pathname === '/api/admin/auth' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const isAuth = payload.passcode === ADMIN_PASSCODE;
        if (isAuth) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, token: 'session-' + crypto.randomBytes(8).toString('hex') }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid admin passcode.' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON.' }));
      }
    });
    return;
  }

  // API: List All Celebrations (Admin Dashboard)
  if (pathname === '/api/celebrations' && method === 'GET') {
    const db = readCelebrations();
    const list = Object.values(db).map(c => ({
      id: c.id,
      name: c.name,
      occasionName: c.occasionName || c.occasionId,
      category: c.category,
      relationship: c.relationship,
      senderName: c.senderName,
      createdAt: c.createdAt,
      photoCount: (c.photos && c.photos.length) || 0,
      coverPhoto: (c.photos && c.photos[0] && c.photos[0].url) || null
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, celebrations: list }));
    return;
  }

  // API: Get Single Celebration by ID
  if (pathname.startsWith('/api/celebrations/') && method === 'GET') {
    const id = pathname.replace('/api/celebrations/', '').trim();
    const db = readCelebrations();
    const celebration = db[id];

    if (!celebration) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Celebration not found.' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, celebration }));
    return;
  }

  // API: Create Celebration
  if (pathname === '/api/celebrations' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Payload too large (Max 25MB).' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const rawName = (payload.name || '').trim();

        if (!rawName) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: "Recipient's name is required." }));
          return;
        }

        const celebrationId = crypto.randomBytes(6).toString('hex');
        const occasionId = payload.occasionId || 'bday-general';
        const categoryId = payload.category || 'birthdays';
        const occasionDefaults = getOccasionConfig(occasionId, categoryId, payload.language || 'en');

        // Process photos
        const processedPhotos = processPhotoGallery(payload.photos || (payload.photoData ? [payload.photoData] : []), celebrationId);

        const newRecord = {
          id: celebrationId,
          createdAt: new Date().toISOString(),
          name: rawName,
          category: categoryId,
          occasionId: occasionId,
          occasionName: payload.occasionName || occasionDefaults.name,
          relationship: payload.relationship || 'Loved One',
          language: payload.language || 'en',
          senderName: (payload.senderName || '').trim(),
          personalNote: (payload.personalNote || '').trim(),
          date: payload.date || '',
          password: (payload.password || '').trim(),
          theme: payload.theme || occasionDefaults.theme,
          activity: payload.activity || occasionDefaults.activity,
          musicTrack: payload.musicTrack || occasionDefaults.music,
          galleryMode: payload.galleryMode || '3d-carousel',
          photos: processedPhotos,
          messages: {
            welcome: (payload.messages && payload.messages.welcome) || occasionDefaults.messages.welcome,
            wish: (payload.messages && payload.messages.wish) || occasionDefaults.messages.wish,
            card: (payload.messages && payload.messages.card) || occasionDefaults.messages.card,
            activity: (payload.messages && payload.messages.activity) || occasionDefaults.messages.activity,
            surprise: (payload.messages && payload.messages.surprise) || occasionDefaults.messages.surprise,
            final: (payload.messages && payload.messages.final) || occasionDefaults.messages.final
          }
        };

        const db = readCelebrations();
        db[celebrationId] = newRecord;
        writeCelebrations(db);

        console.log(`[CELEBRATION CREATED] ID: ${celebrationId} | Recipient: ${newRecord.name} | Occasion: ${newRecord.occasionName} | Rel: ${newRecord.relationship}`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          id: celebrationId,
          url: `/4thday.html?id=${celebrationId}`,
          celebration: newRecord
        }));
      } catch (err) {
        console.error('Error creating celebration:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload.' }));
      }
    });
    return;
  }

  // API: Delete Celebration
  if (pathname.startsWith('/api/celebrations/') && method === 'DELETE') {
    const id = pathname.replace('/api/celebrations/', '').trim();
    const db = readCelebrations();
    if (db[id]) {
      delete db[id];
      writeCelebrations(db);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Celebration deleted.' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Not found.' }));
    }
    return;
  }

  // Static File Serving
  let filePath = pathname === '/' ? '/admin.html' : pathname;
  const safePath = path.normalize(path.join(ROOT_DIR, filePath));

  // Case-insensitive boundary check for Windows compatibility
  if (!safePath.toLowerCase().startsWith(ROOT_DIR.toLowerCase())) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - Not Found</title></head>
        <body style="background:#090314; color:#ffdeec; font-family:sans-serif; text-align:center; padding:80px 20px;">
          <h1 style="font-size:42px; color:#ffd166;">✦ 404 - Resource Not Found ✦</h1>
          <p style="font-size:16px;">The requested surprise or page could not be located.</p>
          <a href="/admin.html" style="color:#ff60ad; text-decoration:underline;">Return to Celebration Studio</a>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(safePath);
    readStream.pipe(res);
  });
});

if (!IS_VERCEL) {
  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`✦ 3D CELEBRATION, LOVE & SURPRISE PLATFORM ACTIVE ✦`);
    console.log(`Admin Studio: http://localhost:${PORT}/admin.html`);
    console.log(`Recipient:    http://localhost:${PORT}/4thday.html`);
    console.log(`Occasions:    80+ across 7 major categories`);
    console.log(`Storage:      ${DATA_DIR}`);
    console.log(`Uploads:      ${UPLOADS_DIR}`);
    console.log(`======================================================\n`);
  });
}

module.exports = server;
