# VOANEVES. README Brand System (Mobile-First Editorial Spec)

Every `voaneves/*` repository shares a unified README layout derived from [`@voaneves/brand`](https://github.com/voaneves/brand/blob/main/docs/readme-spec.md) and automated via [`readme-kit`](https://github.com/voaneves/dtcg-contrast/tree/main/scripts/readme-kit).

## Core Principle: Standalone Product Logos, Unified README Frame

- **Each product keeps its own unique logo** (custom mark, mascot, or emblem — never force a uniform VOANEVES logo frame onto products) so every repository stands on its own and grows organically.
- **Zero tiny text inside SVGs:** Wide SVG hero cards shrink on phones, turning SVG captions illegible. Only iconic marks, CTA buttons (with outlined type paths), and the editorial divider are SVGs; headlines, KPIs, badges, diagrams, and links stay native HTML + GitHub Flavored Markdown.
- **Public vs. private image URLs:** Public repositories use absolute `https://raw.githubusercontent.com/voaneves/<repo>/<default-branch>/…` URLs; private repositories use relative `./…` paths so GitHub renders assets while private.

| Primitive / Asset | Light | Dark | Recommended Size |
| :--- | :--- | :--- | :--- |
| **Product Logo** | Product's own logo (`logo-light.svg` or standalone mark) | Product's own logo (`logo-dark.svg` or theme-safe mark) | `112×112` hero (`76×76` on profile) |
| **CTA Buttons** | `assets/buttons/<id>-light.svg` | `assets/buttons/<id>-dark.svg` | `height="40"` (max 2 in hero, 2 in footer) |
| **Editorial Divider** | `assets/brand/rule-light.svg` | `assets/brand/rule-dark.svg` | `width="100%"` (exactly 1 after hero) |
| **Author Colophon Mark** | `assets/brand/mark-duo.svg` | `assets/brand/mark-duo.svg` (single file, no `<picture>`) | `32×32` centered in footer |

## Canonical Palette & Badge Grammar

| Role | Light | Dark | Badge / Usage Rule |
| :--- | :--- | :--- | :--- |
| Ink / Ground | `#0a0a0a` | `#e8dec5` | `flat-square` primary badges (`0A0A0A`) |
| Signal Ink | `#b80000` | `#ff5a5a` | Highlight badges (`B80000` — WCAG AA `5.78:1` on cream, `6.91:1` on white) |
| Muted Sand | `#5c5446` | `#a69c86` | Secondary spec badges (`5C5446`) |

All generated button, logo, and colophon tokens in `.github/readme-kit/tokens.json` are gated on every push by `.github/workflows/readme-kit.yml` using `voaneves/dtcg-contrast@v1`.

## README Spec Checklist

1. `<a id="top"></a>` + centered `<div align="center">` Hero with plain-text language switcher (only when bilingual, no flag emojis, `lang` attribute set), `112×112` product logo, `<h1>` project name, one bold tagline, optional `<sub>` subtitle.
2. At most 2 CTA buttons (`height="40"`), one hire line (`Need something like this? Let's talk →`), at most 4 accurate `flat-square` badges, and a one-line text nav (no `<details>` Table of Contents).
3. Exactly **one** `rule-*.svg` divider between Hero and first section.
4. First section opens with **one** plain-language sentence saying what the project does for a person.
5. No emoji in `##`/`###` headings (`✅` `❌` `⚠️` inside tables are fine); tables `<= 4` columns so they fit at `390px`.
6. Footer: `## Contact` / `## Contato` with 2 CTA buttons (`hire` + `voaneves.com`), `LinkedIn · E-mail` text links, `32×32` `mark-duo.svg`, license line, and centered `↑ Back to top` / `↑ Voltar ao topo`.

## Generate Assets & Contrast Gate for a Repo

```bash
python ../dtcg-contrast/scripts/readme-kit/build.py \
  --manifest .github/readme-kit/manifest.json \
  --repo-dir . \
  --only buttons,brand,tokens,workflow \
  --no-png \
  --brand-fonts ../brand/fonts
```
