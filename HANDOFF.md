# Fileninja — Your Step-by-Step Handoff Guide

This is the **only** doc you need to follow. Do these in order.

---

## ✅ Right Now — Verify the Site Locally

The dev server is **already running** at port 3005.

1. Open your browser → **http://localhost:3005**
2. Click through every page from the header/footer:
   - Home, Pricing, Features, Sign in, Sign up, About, Contact, Blog, Developer API, Vault, Terms, Privacy, Security, DPA, Cookies
3. If any page looks broken, tell me which one.

If the dev server is **not** running, start it:
```powershell
# In a fresh PowerShell window in C:\Users\hartm\fileninja
npm run dev
```
Then visit `http://localhost:3005`.

---

## 📌 STEP 1 — Drop Your Real Logo PNG

Right now `public/logo.png` is a placeholder. Replace it with your actual ninja logo image:

1. Save your logo image (the one you sent me) as `logo.png`
2. Copy it to: `C:\Users\hartm\fileninja\public\logo.png`
3. Refresh the browser — header & footer will pick it up automatically.

**Optional**: also save a 512×512 favicon as `public/favicon.ico`.

---

## 📌 STEP 2 — Create `.env.local` (Secrets File)

Create the file `C:\Users\hartm\fileninja\.env.local` with these values:

```env
# === SITE ===
NEXT_PUBLIC_SITE_URL=http://localhost:3005

# === SUPABASE === (get from https://supabase.com/dashboard → your project → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...

# === STRIPE === (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...    # see Step 5 below
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe price IDs — already created for you in test mode:
NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY=price_1TPD5bPW61ouIFFs7CVWBoqA
NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY=price_1TPD5bPW61ouIFFsaFsBkw8E
NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY=price_1TPD5cPW61ouIFFshwhhFuMN
NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY=price_1TPD5dPW61ouIFFsZ675vBIB

# === RESEND === (optional — for contact form emails) https://resend.com/api-keys
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=hello@fileninja.cloud
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

After saving, **restart the dev server** (Ctrl+C in its terminal, then `npm run dev`).

---

## 📌 STEP 3 — Update Supabase Auth Redirect URL

1. Go to your Supabase dashboard → **Authentication → URL Configuration**
2. Set **Site URL**: `http://localhost:3005`
3. Add to **Redirect URLs**:
   - `http://localhost:3005/auth/callback`
   - `https://fileninja.cloud/auth/callback` (for production)
4. Save.

Test: go to `/signup`, create an account → check your email → click confirmation link → should land on `/dashboard`.

---

## 📌 STEP 4 — Test Stripe Checkout (Local)

1. Make sure `.env.local` has all Stripe keys (Step 2).
2. Go to `/pricing`, click **Start with Pro** → you should be redirected to Stripe Checkout.
3. Use test card: `4242 4242 4242 4242`, any future expiry, any CVC.
4. After payment → you'll come back to `/dashboard` with Pro shown.

---

## 📌 STEP 5 — Wire Stripe Webhook (Local Testing)

In a **new** PowerShell terminal (keep dev server running):

```powershell
# 1. Install Stripe CLI if you haven't:  https://stripe.com/docs/stripe-cli
# 2. Login:
stripe login

# 3. Forward webhooks to your local server:
stripe listen --forward-to localhost:3005/api/stripe/webhook
```

The CLI will print a `whsec_...` value. **Copy it** and paste it into `.env.local` as `STRIPE_WEBHOOK_SECRET`. Restart the dev server.

Now Stripe events (subscription created, updated, cancelled) will sync to your Supabase `subscriptions` table automatically.

---

## 📌 STEP 6 — Deploy to Production (85.215.225.0)

When ready to go live:

### 6a. Point DNS
At your domain registrar for **fileninja.cloud**:
- Create an **A record**: `@` → `85.215.225.0`
- Create an **A record**: `www` → `85.215.225.0`

### 6b. SSH to server
```bash
ssh root@85.215.225.0
```

### 6c. First-time server setup
```bash
# Clone your repo (or upload via SCP)
git clone <your-repo-url> /var/www/fileninja
cd /var/www/fileninja

# Run bootstrap (installs Node 20, PM2, Nginx, Certbot)
chmod +x deploy/setup-server.sh
./deploy/setup-server.sh
```

### 6d. Create production `.env.local` on the server
```bash
nano /var/www/fileninja/.env.local
# Paste the same vars as Step 2, but change:
# NEXT_PUBLIC_SITE_URL=https://fileninja.cloud
# Use Stripe LIVE keys instead of test keys when ready
```

### 6e. Deploy
```bash
cd /var/www/fileninja
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

This will: pull latest code → `npm install` → `npm run build` → `pm2 reload`.

### 6f. Setup Nginx + HTTPS
```bash
cp deploy/nginx.conf /etc/nginx/sites-available/fileninja.cloud
ln -s /etc/nginx/sites-available/fileninja.cloud /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Get free SSL cert
certbot --nginx -d fileninja.cloud -d www.fileninja.cloud
```

### 6g. Configure live Stripe webhook
1. Stripe Dashboard → Developers → Webhooks → **Add endpoint**
2. URL: `https://fileninja.cloud/api/stripe/webhook`
3. Events to send: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`
4. Copy the new `whsec_...` → update `.env.local` on server → `pm2 reload fileninja`

### 6h. Update Supabase redirect URL
- Add `https://fileninja.cloud/auth/callback` to allowed redirect URLs.

✅ **You're live at https://fileninja.cloud**

---

## 🆘 Troubleshooting

| Problem | Fix |
|---|---|
| `EADDRINUSE :::3005` | Dev server already running — just open the browser. To kill: `Get-Process node \| Stop-Process -Force` then `npm run dev` |
| Pages load but auth fails | Check `.env.local` Supabase keys + restart dev server |
| Stripe checkout 500 error | Verify `STRIPE_SECRET_KEY` and price IDs in `.env.local` |
| Contact form does nothing | Without `RESEND_API_KEY`, submissions only log to terminal — that's expected |
| Logo not showing | Confirm file exists at `public/logo.png` and hard-refresh (Ctrl+Shift+R) |

---

## 📞 What To Tell Me Next

After you finish Step 1 (drop the logo) and visit the site, tell me:
- ✅ "Looks good, let's deploy" → I'll guide you through Steps 6a-6h interactively
- 🛠 "Change X on page Y" → I'll fix
- 🔌 "I added Supabase/Stripe keys, test the flows" → I'll run end-to-end tests
