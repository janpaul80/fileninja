# Fileninja — Environment Variables Reference

This is the **canonical list** of all env vars used by Fileninja. Copy these variable names verbatim into your `.env.local` file at the project root. **Never commit `.env.local` to git.**

---

## Required for Production

### Site
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3005
# In production: NEXT_PUBLIC_SITE_URL=https://fileninja.cloud
```

### Supabase (auth + database + storage)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```
> Find these in Supabase Dashboard → Project Settings → API.
> `SERVICE_ROLE_KEY` is a secret — server-side only, never exposed to the browser.

### Stripe (billing)
```env
# TEST MODE keys (use these first)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs — generated via scripts/stripe-setup.sh (see below)
# These are READ server-side only (no NEXT_PUBLIC_ prefix).
STRIPE_PRICE_BASIC_MONTHLY=price_...
STRIPE_PRICE_BASIC_YEARLY=price_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_YEARLY=price_...
```

---

## Supabase OAuth Provider Setup

In Supabase Dashboard → **Authentication → Providers**, enable and configure:

### Google
- Client ID: *(from Google Cloud Console OAuth 2.0 Client)*
- Client Secret: *(from Google Cloud Console OAuth 2.0 Client)*
- Redirect URL (set this in Google Cloud Console):
  - `https://xxxxxxxxxxxxxxxx.supabase.co/auth/v1/callback`

### GitHub
- Client ID: *(from GitHub → Settings → Developer settings → OAuth Apps)*
- Client Secret
- Authorization callback URL (set in GitHub):
  - `https://xxxxxxxxxxxxxxxx.supabase.co/auth/v1/callback`

### Supabase Site URL & Redirect URLs
Supabase Dashboard → **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3005` (dev) or `https://fileninja.cloud` (prod)
- **Additional Redirect URLs** (add both):
  - `http://localhost:3005/auth/callback`
  - `https://fileninja.cloud/auth/callback`

---

## Stripe Setup (first-time)

1. Log into Stripe Dashboard as the **Heftcoder AI** account
2. Switch to **Test mode** (top-right toggle)
3. Run the Stripe CLI script to create the Fileninja product + 4 prices:
   ```bash
   # Install Stripe CLI first: https://stripe.com/docs/stripe-cli
   stripe login
   bash scripts/stripe-setup.sh
   ```
4. The script prints 4 Price IDs — paste them into `.env.local`
5. For webhooks locally:
   ```bash
   stripe listen --forward-to localhost:3005/api/stripe/webhook
   ```
   Copy the `whsec_...` it prints → `STRIPE_WEBHOOK_SECRET`
6. For production webhooks: Stripe Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://fileninja.cloud/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

---

## Going Live (before production launch)

1. Switch Stripe Dashboard to **Live mode**
2. Re-run `scripts/stripe-setup.sh` in live mode (creates live prices)
3. Replace test keys with live keys in production `.env.local`:
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...`
   - All 4 `STRIPE_PRICE_*` IDs (new live ones)
4. Update `NEXT_PUBLIC_SITE_URL=https://fileninja.cloud`
5. Rebuild & reload: `sudo -u fileninja bash deploy/deploy.sh`
