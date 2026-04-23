# Fileninja

> The simple way to send your stuff. A modern, gallery-style file-transfer SaaS — built with Next.js 14, TypeScript, and Tailwind CSS.

![Fileninja](public/logo.png)

---

## ✨ What's inside

- **Hero** — full-screen rotating, artist-curated background artwork (cinematic crossfade)
- **Upload widget** — drag-and-drop with glow, progress bar, recipient form
- **Features grid** — 9 polished, icon-driven cards (no emojis, all inline SVGs)
- **Pricing** — 3-tier plan (Free / Pro highlighted / Business) with monthly↔yearly toggle
- **Auth** — UI-only login & signup pages (backend in phase 2)
- **Animations** — scroll-triggered fade-ins, button hover fills, pulse-ring upload zone, slow-zoom backgrounds, staggered hero reveal
- **Editorial typography** — Plus Jakarta Sans (display) + Inter (body) via `next/font`
- **Brand palette** — `#E63329` red · `#1A2332` dark · `#0FB5A5` teal accent · `#FAFAF8` off-white

---

## 🚀 Quick start (localhost)

```bash
npm install
npm run dev
```

Open **http://localhost:3005**.

### Routes

| Path        | Description                              |
|-------------|------------------------------------------|
| `/`         | Landing — hero, upload, features, artists, CTA |
| `/pricing`  | 3-tier pricing + FAQ + trust strip       |
| `/login`    | Sign-in (UI only)                        |
| `/signup`   | Sign-up (UI only)                        |

---

## 🖼️ Replace the logo

A placeholder is at `public/logo.png` (1×1 transparent PNG) and `public/logo.svg`.
**Drop your real logo PNG into `public/logo.png`** — no code changes needed. Recommended size: 512×512.

---

## 🎨 Tweak the artist gallery

Edit `src/lib/artworks.ts` to add/remove rotating hero backgrounds. Each entry needs:

```ts
{ url: "https://...", artist: "Artist Name", title: "Piece Title" }
```

The hero crossfades between them every 7 seconds with a 2.2-second fade and a subtle slow-zoom.

---

## 🏗️ Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with custom brand tokens & keyframes
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) + [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google`
- All icons are hand-rolled inline SVGs in `src/components/icons/index.tsx` — **no emojis anywhere**

---

## 📁 Project structure

```
fileninja/
├── public/
│   ├── logo.png          ← replace with your real logo
│   └── logo.svg          ← fallback SVG
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              (landing)
│   │   ├── pricing/page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBackground.tsx
│   │   ├── UploadWidget.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── PricingCards.tsx
│   │   ├── FadeIn.tsx
│   │   └── icons/index.tsx
│   └── lib/
│       └── artworks.ts
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 🌐 Deployment to `85.215.225.0`

When you're ready to deploy to your server, the simplest production-ready setup is **PM2 + Nginx**:

### 1. On the server

```bash
# Install Node 20+ (one-time)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repo and install
git clone <your-repo-url> /var/www/fileninja
cd /var/www/fileninja
npm ci
npm run build

# Install PM2 globally and start
sudo npm install -g pm2
pm2 start npm --name fileninja -- run start:prod
pm2 save
pm2 startup
```

`npm run start:prod` binds to `0.0.0.0:3005` (already configured in `package.json`).

### 2. Nginx reverse proxy (recommended)

Create `/etc/nginx/sites-available/fileninja`:

```nginx
server {
    listen 80;
    server_name 85.215.225.0 fileninja.io www.fileninja.io;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 100M; # bump for big upload UX
}
```

```bash
sudo ln -s /etc/nginx/sites-available/fileninja /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3. (Optional) HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d fileninja.io -d www.fileninja.io
```

Your app will then be live at **http://85.215.225.0** (port 3005 internally, proxied to 80/443 by Nginx) and your domain once DNS is pointed.

---

## 🛣️ Roadmap

- **Phase 1** ✅ — Frontend scaffold (this repo)
- **Phase 2** — Real upload backend (S3/R2 multipart), email delivery, share-link pages
- **Phase 3** — Auth (NextAuth + Postgres), personal vault dashboard
- **Phase 4** — Stripe billing, custom domains, API + webhooks
- **Phase 5** — Production deployment to `85.215.225.0`

---

## 📜 License

© Fileninja. All rights reserved.
