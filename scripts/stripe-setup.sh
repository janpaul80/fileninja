#!/usr/bin/env bash
# ============================================================================
# Fileninja — Stripe price setup
#
# Creates (or re-uses) a single Stripe product "Fileninja" and 4 prices:
#   basic monthly  $4.99
#   basic yearly   $47.99
#   pro   monthly  $12.99
#   pro   yearly   $99.99
#
# Prints the 4 Price IDs so you can paste them into .env.local:
#   STRIPE_PRICE_BASIC_MONTHLY=...
#   STRIPE_PRICE_BASIC_YEARLY=...
#   STRIPE_PRICE_PRO_MONTHLY=...
#   STRIPE_PRICE_PRO_YEARLY=...
#
# Requirements:
#   * Stripe CLI installed + logged in:  stripe login
#   * jq installed                      (brew install jq / apt install jq)
#
# Usage:
#   bash scripts/stripe-setup.sh                 # defaults to TEST mode
#   bash scripts/stripe-setup.sh --live          # LIVE mode (⚠ real money)
# ============================================================================
set -euo pipefail

MODE_FLAG=""
if [[ "${1:-}" == "--live" ]]; then
  MODE_FLAG="--live"
  echo "⚠  Running in LIVE mode."
else
  echo "•  Running in TEST mode. Pass --live for production."
fi

command -v stripe >/dev/null 2>&1 || { echo "Stripe CLI not found. https://stripe.com/docs/stripe-cli"; exit 1; }
command -v jq     >/dev/null 2>&1 || { echo "jq not found."; exit 1; }

PRODUCT_NAME="Fileninja"

# Re-use product by name if already exists
echo "• Looking up product '$PRODUCT_NAME'..."
EXISTING_PRODUCT=$(stripe products list $MODE_FLAG --limit 100 \
  | jq -r --arg n "$PRODUCT_NAME" '.data[] | select(.name==$n) | .id' \
  | head -n 1 || true)

if [[ -n "${EXISTING_PRODUCT:-}" ]]; then
  PRODUCT_ID="$EXISTING_PRODUCT"
  echo "  ↳ reusing product $PRODUCT_ID"
else
  PRODUCT_ID=$(stripe products create $MODE_FLAG \
    --name="$PRODUCT_NAME" \
    --description="Send big files, fast. Gallery-style file transfer SaaS." \
    | jq -r '.id')
  echo "  ↳ created product $PRODUCT_ID"
fi

create_price () {
  local LOOKUP_KEY="$1" AMOUNT="$2" INTERVAL="$3" NICKNAME="$4"

  local EXISTING
  EXISTING=$(stripe prices list $MODE_FLAG --product "$PRODUCT_ID" --limit 100 \
    | jq -r --arg k "$LOOKUP_KEY" '.data[] | select(.lookup_key==$k and .active==true) | .id' \
    | head -n 1 || true)

  if [[ -n "${EXISTING:-}" ]]; then
    echo "$EXISTING"
    return
  fi

  stripe prices create $MODE_FLAG \
    --product="$PRODUCT_ID" \
    --currency=usd \
    --unit-amount="$AMOUNT" \
    -d "recurring[interval]=$INTERVAL" \
    --nickname="$NICKNAME" \
    --lookup-key="$LOOKUP_KEY" \
    | jq -r '.id'
}

echo "• Creating prices..."
BASIC_M=$(create_price "fileninja_basic_monthly"  499  month "Basic Monthly")
BASIC_Y=$(create_price "fileninja_basic_yearly"   4799 year  "Basic Yearly")
PRO_M=$(  create_price "fileninja_pro_monthly"    1299 month "Pro Monthly")
PRO_Y=$(  create_price "fileninja_pro_yearly"     9999 year  "Pro Yearly")

echo
echo "=========================================================="
echo "✓ Stripe setup complete. Paste these into .env.local:"
echo "=========================================================="
echo
echo "STRIPE_PRICE_BASIC_MONTHLY=$BASIC_M"
echo "STRIPE_PRICE_BASIC_YEARLY=$BASIC_Y"
echo "STRIPE_PRICE_PRO_MONTHLY=$PRO_M"
echo "STRIPE_PRICE_PRO_YEARLY=$PRO_Y"
echo
echo "Product: $PRODUCT_ID"
echo
echo "Next: configure webhook endpoint in Stripe Dashboard →"
echo "  URL:    https://fileninja.cloud/api/stripe/webhook"
echo "  Events: checkout.session.completed,"
echo "          customer.subscription.created,"
echo "          customer.subscription.updated,"
echo "          customer.subscription.deleted"
echo "Copy the signing secret → STRIPE_WEBHOOK_SECRET in .env.local"
