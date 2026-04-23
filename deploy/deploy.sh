#!/usr/bin/env bash
# ============================================================================
# Fileninja — redeploy (pull + build + reload) on the server
# Run as the fileninja app user, from /var/www/fileninja:
#   sudo -u fileninja bash deploy/deploy.sh
# ============================================================================
set -euo pipefail

cd "$(dirname "$0")/.."

echo "▸ Pulling latest…"
git pull --ff-only

echo "▸ Installing deps…"
npm ci

echo "▸ Building…"
npm run build

echo "▸ Reloading PM2 process…"
pm2 reload fileninja || pm2 start ecosystem.config.js --env production
pm2 save

echo "✓ Deploy complete."
