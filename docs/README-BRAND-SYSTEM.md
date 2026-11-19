# VOANEVES. README Brand System (v2 — Mobile-First Editorial)

Every `voaneves/*` repository shares a unified visual architecture derived from [`@voaneves/brand`](https://github.com/voaneves/brand) (**Concept B — Sinal**).

## Core UX Rule: Zero Tiny Text Inside SVGs

Wide SVG hero cards shrink to 360px on phones, turning SVG captions and tags illegible.
Therefore, **`voaneves/*` READMEs strictly restrict SVGs to pure iconic/geometric primitives**, while all headlines, subheads, KPIs, badges, diagrams, and CTAs render as responsive native **HTML + GitHub Flavored Markdown**:

| Primitive | Light | Dark | Recommended Size |
| :--- | :--- | :--- | :--- |
| **Concept B Mark** | `mark-light.svg` (`#0a0a0a` + `#f50000`) | `mark-dark.svg` (`#ffffff` + `#ff3838`) | `76px`–`88px` hero / `32px` colophon |
| **Wordmark (`VOANEVES.`)** | `wordmark-light.svg` (`#0a0a0a` + `#f50000`) | `wordmark-dark.svg` (`#e8dec5` + `#ff3838`) | `width="260"` |
| **Editorial Divider** | `rule-light.svg` (`rgba(10,10,10,0.16)` + `#f50000`) | `rule-dark.svg` (`rgba(232,222,197,0.16)` + `#ff3838`) | `width="100%"` |

## Canonical Palette & Badge Grammar

| Role | Light | Dark | Badge / Usage Rule |
| :--- | :--- | :--- | :--- |
| Ink / Ground | `#0a0a0a` | `#e8dec5` | `flat-square` primary badges (`0A0A0A`) |
| Signal Ink | `#b80000` | `#ff5a5a` | Highlight badges (`B80000` — WCAG AA `5.78:1` on cream, `6.91:1` on white) |
| Muted Sand | `#5c5446` | `#a69c86` | Secondary spec badges (`5C5446`) |

## Authorial HTML + GFM Section Blueprint

1. `<a id="top"></a>` + centered language switch + `<picture>` Concept B Mark + responsive HTML `<h1>` / `<picture>` Wordmark
2. Unified `flat-square` badges + centered quick-jump bar + `<details>` Table of Contents (`<ol>`)
3. GitHub Callout Alert (`> [!NOTE]` or `> [!IMPORTANT]`) for instant executive positioning
4. HTML **Bento Grid** (`<table>` with bold `<h3>` KPIs / capability cards) + native **Mermaid** architecture flow
5. Native `diff` blocks, inline hex color chips (`` `#f50000` ``), collapsible `<details>` deep-dives / KaTeX math (`$$...$$`)
6. Editorial HTML Colophon band (2-column consulting card + `32×32` `<picture>` mark + `<p align="right"><a href="#top">↑ Back to top</a></p>`)

## Generate Primitives for Any Repo

```bash
node scripts/brand-readme.mjs --primitives ../<repo>/assets/brand
```
