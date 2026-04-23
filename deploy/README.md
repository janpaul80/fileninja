# Fileninja — Deployment Guide

Target: **fileninja.cloud** → **85.215.225.0** (Ubuntu 22.04 LTS, root SSH).

---

## 0. DNS

In your domain registrar, point:

```
fileninja.cloud        A   85.215.225.0
www.fileninja.cloud    A   85.215.225.0
```

Wait a few minutes for propagation (`dig fileninja.cloud +short`).

---

## 1. Supabase

1. In the Supabase dashboard, open the **SQL editor** and paste the contents of
   [`supabase/schema.sql`](../supabase/schema.sql). Run it.
2. **Auth → Providers**: enable **Google** and **GitHub** (already done per user).
3. **Auth → URL Configuration**:
   - Site URL: `https://fileninja.cloud`
   - Redirect URLs:
     - `https://fileninja.cloud/auth/callback`
     - `http://localhost:3005/auth/callback`
4. Copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY` into `.env.local` (see `ENV_VARIABLES.md`).

---

## 2. Stripe

Run once locally (or on the server):

```bash
stripe login
bash scripts/stripe-setup.sh            # TEST mode
# or:
bash scripts/stripe-setup.sh --live     # LIVE mode
```

Copy the 4 printed `STRIPE_PRICE_*` IDs into `.env.local`.

Then in the Stripe Dashboard → **Developers → Webhooks** → Add endpoint:

- URL: `https://fileninja.cloud/api/stripe/webhook`
- Events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

Copy the **signing secret** (`whsec_…`) into `STRIPE_WEBHOOK_SECRET`.

---

## 3. Server provisioning

SSH into the server as root:

```bash
ssh root@85.215.225.0
```

Clone the repo and run the one-shot setup:

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/<YOUR_ORG>/fileninja.git
cd fileninja

# Create production env file (see ENV_VARIABLES.md for the full list)
cp ENV_VARIABLES.md /tmp/  # reference
nano .env.local            # paste real values

LETSENCRYPT_EMAIL="you@fileninja.cloud" bash deploy/setup-server.sh
```

This script is idempotent; safe to re-run.

It installs: Node 20, PM2, Nginx, Certbot, UFW. It issues a Let's Encrypt
cert for `fileninja.cloud` + `www.fileninja.cloud`, sets up the reverse
proxy, builds the app, and starts it under PM2.

---

## 4. Redeploys

After pushing new code to `main`:

```bash
ssh root@85.215.225.0
cd /var/www/fileninja
sudo -u fileninja bash deploy/deploy.sh
```

(or wire this into a GitHub Actions workflow.)

---

## 5. Useful ops commands

```bash
pm2 status
pm2 logs fileninja --lines 100
pm2 reload fileninja
systemctl reload nginx
tail -f /var/log/nginx/access.log
certbot renew --dry-run
```

---

## 6. Rollback

```bash
cd /var/www/fileninja
git reflog                  # find previous commit
git reset --hard <sha>
sudo -u fileninja bash deploy/deploy.sh
