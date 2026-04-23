#!/usr/bin/env bash
# ============================================================================
# Fileninja — one-shot Ubuntu 22.04 LTS server provisioning
#
# Target:  85.215.225.0  (root SSH)
# Domain:  fileninja.cloud  (A record → 85.215.225.0  already set)
#
# Installs: Node 20, pnpm, PM2, Nginx, Certbot, UFW.
# Deploys:  /var/www/fileninja (from a git clone you perform manually first).
# Issues:   Let's Encrypt SSL for fileninja.cloud + www.
#
# Usage (as root on the server):
#   curl -fsSL https://raw.githubusercontent.com/<you>/fileninja/main/deploy/setup-server.sh \
#        -o setup-server.sh
#   chmod +x setup-server.sh
#   sudo bash setup-server.sh
#
# Or rsync the file and run:  sudo bash /root/setup-server.sh
# ============================================================================
set -euo pipefail

DOMAIN="fileninja.cloud"
DOMAIN_WWW="www.fileninja.cloud"
APP_DIR="/var/www/fileninja"
APP_USER="fileninja"
NODE_MAJOR=20
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-admin@fileninja.cloud}"

log() { echo -e "\n\033[1;36m▸ $*\033[0m"; }

if [[ $EUID -ne 0 ]]; then
  echo "Run as root (sudo bash $0)"
  exit 1
fi

log "1/10  apt update + base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y curl ca-certificates gnupg git ufw build-essential \
                   nginx software-properties-common

log "2/10  Node.js $NODE_MAJOR (NodeSource)"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v | cut -c2- | cut -d. -f1)" != "$NODE_MAJOR" ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

log "3/10  PM2 (global)"
npm install -g pm2@latest

log "4/10  App user + directories"
id -u "$APP_USER" >/dev/null 2>&1 || useradd --system --create-home --shell /bin/bash "$APP_USER"
mkdir -p "$APP_DIR" /var/log/fileninja /var/www/certbot
chown -R "$APP_USER":"$APP_USER" "$APP_DIR" /var/log/fileninja

log "5/10  Firewall (UFW)"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status

log "6/10  Nginx config"
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/fileninja 2>/dev/null || \
  echo "⚠  $APP_DIR/deploy/nginx.conf not found yet — clone the repo first, then re-run."
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/fileninja /etc/nginx/sites-enabled/fileninja
if nginx -t; then
  systemctl reload nginx
else
  echo "⚠  nginx config test failed — fix before continuing."
fi

log "7/10  Certbot (Let's Encrypt)"
apt-get install -y certbot python3-certbot-nginx
# Only request cert if it doesn't already exist
if [[ ! -d "/etc/letsencrypt/live/$DOMAIN" ]]; then
  certbot --nginx --non-interactive --agree-tos \
          --email "$LETSENCRYPT_EMAIL" \
          -d "$DOMAIN" -d "$DOMAIN_WWW" \
          --redirect
else
  echo "  ↳ cert already exists for $DOMAIN — skipping"
fi
systemctl enable --now certbot.timer

log "8/10  App install (expects repo already cloned to $APP_DIR)"
if [[ -f "$APP_DIR/package.json" ]]; then
  cd "$APP_DIR"
  sudo -u "$APP_USER" -H bash -lc "npm ci --omit=dev=false"
  sudo -u "$APP_USER" -H bash -lc "npm run build"
else
  echo "⚠  $APP_DIR/package.json not found — clone the repo here, copy .env.local,"
  echo "    then re-run this script or run:  cd $APP_DIR && npm ci && npm run build"
fi

log "9/10  PM2 process"
if [[ -f "$APP_DIR/ecosystem.config.js" ]]; then
  cd "$APP_DIR"
  sudo -u "$APP_USER" -H pm2 start ecosystem.config.js --env production || \
    sudo -u "$APP_USER" -H pm2 reload ecosystem.config.js --env production
  sudo -u "$APP_USER" -H pm2 save
  # Boot on reboot
  env PATH=$PATH:/usr/bin pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER"
fi

log "10/10  Done."
cat <<EOF

✓ Fileninja server provisioning complete.

   Site:      https://$DOMAIN
   App dir:   $APP_DIR
   Logs:      /var/log/fileninja/*.log   (pm2 logs fileninja)
   Process:   pm2 status / pm2 reload fileninja
   Nginx:     systemctl reload nginx

Next:
  1. Create/update $APP_DIR/.env.local (see ENV_VARIABLES.md)
  2. cd $APP_DIR && sudo -u $APP_USER npm run build && sudo -u $APP_USER pm2 reload fileninja
  3. Add Stripe webhook endpoint → https://$DOMAIN/api/stripe/webhook
     and paste STRIPE_WEBHOOK_SECRET into .env.local

EOF
