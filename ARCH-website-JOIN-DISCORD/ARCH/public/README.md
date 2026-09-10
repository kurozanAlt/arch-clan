# ARCH Clan Website

## Struktur
ARCH/
├── public/
│   └── index.html
├── server.js
├── package.json
├── .env.example
└── .gitignore

## Sebelum deploy
1. Buat widget Cloudflare Turnstile.
2. Salin Site Key ke `data-sitekey` di `public/index.html`.
3. Jangan masukkan Secret Key ke HTML.
4. Di hosting, buat environment variable:
   TURNSTILE_SECRET_KEY = Secret Key milik Turnstile
5. Jalankan:
   npm install
   npm start

## Penting
Jangan kirim Secret Key ke siapa pun atau commit file `.env` ke GitHub.
