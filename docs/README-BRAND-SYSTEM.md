# VOANEVES. README Brand System

Every `voaneves/*` repository shares one Swiss-editorial visual identity derived directly from [`@voaneves/brand`](https://github.com/voaneves/brand) (**Concept B — Sinal**).

## 1. Color & Accessibility Tokens (WCAG 2.2 AA Verified)

| Token | Light (`Cream`) | Dark (`Ink`) | Usage & Contrast |
| :--- | :--- | :--- | :--- |
| Ground | `#f4ead4` | `#0a0a0a` | Primary hero/card surface |
| Surface Soft | `#efe4c5` | `#141414` | Pills, footer colophon plate |
| Primary Ink | `#0a0a0a` | `#e8dec5` | Titles, body text (`16.56:1` light / `14.79:1` dark) |
| Muted Sand | `#5c5446` | `#a69c86` | Subtitles, metadata (`6.25:1` light / `7.28:1` dark) |
| Signal Ink | `#b80000` | `#ff5a5a` | Small eyebrow text & badges (`5.78:1` light / `6.47:1` dark) |
| Signal Accent | `#f50000` | `#ff3838` | Accent rails, full-stop dot, CTA fill (`#0a0a0a` Ink text only: `4.60:1` / `5.54:1`) |

## 2. Standard 6-Section README Anatomy

1. **Language switcher** (`🇺🇸 English · 🇧🇷 Português (PT-BR)` centered on one line)
2. **Adaptive `<picture>` Hero SVG** (`1200×320` light/dark, Concept B disc mark, eyebrow, title + `.`, subtitle, 4 spec tags, subtle wave motif)
3. **Unified `flat-square` badges + Quick-Jump Nav** (strictly `#0a0a0a`, `#b80000`, `#5c5446` — zero chaotic rainbow colors)
4. **Why / Value Proof + Visual Demo** (table or SVG/screenshot)
5. **Quick Start, CLI / API Reference & Case Studies** (separated by centered Signal-dot `<picture>` rules)
6. **Shared Colophon Footer** (`footer-{dark,light}.svg` hosted in `voaneves/voaneves`, linking to `voaneves.com`)

## 3. Branding Any Repository in 30 Seconds

Generate bespoke Light/Dark hero SVGs for any repository using the zero-dependency generator:

```bash
# Shared dividers & footers (hosted centrally in voaneves/voaneves)
node scripts/brand-readme.mjs --shared ./assets/brand

# Per-repository hero pair
node scripts/brand-readme.mjs --hero \
  --out ../my-repo/assets/brand \
  --prefix hero \
  --title "my-repo" \
  --eyebrow "02 / CATEGORY · STACK" \
  --subtitle "Crisp one-sentence value proposition." \
  --pill "TAG · LICENSE" \
  --tags "ZERO DEPS,FAST,TESTED,MIT"
```
