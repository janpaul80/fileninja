const fs = require("fs");
const path = require("path");

if (!fs.existsSync("public")) fs.mkdirSync("public");

// Stylized Fileninja mark — rounded square with red ninja band ("SEND!"),
// dark mask with red eyes, and a red speed-streak below.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-label="Fileninja">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1A2332"/>
      <stop offset="1" stop-color="#0B1220"/>
    </linearGradient>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#E63329"/>
      <stop offset="1" stop-color="#C42820"/>
    </linearGradient>
  </defs>

  <!-- Card background -->
  <rect width="256" height="256" rx="56" fill="url(#bg)"/>

  <!-- Ninja head/mask -->
  <g transform="translate(128 132)">
    <circle r="62" fill="#0B1220" stroke="#0F1620" stroke-width="2"/>

    <!-- Headband -->
    <rect x="-62" y="-12" width="124" height="20" fill="url(#band)"/>
    <!-- Headband knots -->
    <path d="M-62 -12 L-78 -26 L-84 -8 L-78 12 L-62 8 Z" fill="#E63329"/>
    <path d="M62 -12 L78 -26 L84 -8 L78 12 L62 8 Z" fill="#E63329"/>
    <path d="M-78 -26 L-90 -34 M-78 12 L-92 18" stroke="#C42820" stroke-width="3" stroke-linecap="round"/>
    <path d="M78 -26 L90 -34 M78 12 L92 18" stroke="#C42820" stroke-width="3" stroke-linecap="round"/>

    <!-- SEND! text on band -->
    <text x="0" y="3" text-anchor="middle"
          font-family="Arial Black, Impact, system-ui, sans-serif"
          font-weight="900" font-size="14" fill="#ffffff" letter-spacing="1.5">SEND!</text>

    <!-- Eyes (red, glowing) -->
    <ellipse cx="-22" cy="26" rx="10" ry="6.5" fill="#E63329"/>
    <ellipse cx="22" cy="26" rx="10" ry="6.5" fill="#E63329"/>
    <ellipse cx="-22" cy="25" rx="3" ry="2" fill="#fff" opacity="0.9"/>
    <ellipse cx="22" cy="25" rx="3" ry="2" fill="#fff" opacity="0.9"/>
  </g>

  <!-- Speed streak / cape -->
  <path d="M28 218 L72 200 L116 222 L160 202 L212 224 L228 234 L48 234 Z"
        fill="#E63329" opacity="0.92"/>
  <path d="M48 234 L228 234" stroke="#C42820" stroke-width="2" opacity="0.6"/>
</svg>
`;

fs.writeFileSync(path.join("public", "logo.svg"), svg);

// 1x1 transparent PNG fallback (so /logo.png never 404s if any code references it)
const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
fs.writeFileSync(path.join("public", "logo.png"), Buffer.from(pngBase64, "base64"));

// Favicon = same SVG
fs.writeFileSync(path.join("public", "favicon.svg"), svg);

console.log(
  "Logo files written:",
  fs.statSync("public/logo.svg").size, "bytes svg,",
  fs.statSync("public/favicon.svg").size, "bytes favicon"
);
