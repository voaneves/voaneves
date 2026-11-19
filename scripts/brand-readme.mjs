#!/usr/bin/env node
/**
 * Zero-dependency README Brand SVG generator for voaneves/* repositories.
 * Grounded in @voaneves/brand (Concept B "Sinal", Ink/Cream/Sinal WCAG 2.2 AA palette).
 */

import fs from 'node:fs';
import path from 'node:path';

const MARK_PATH =
  'M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0ZM142 148L214 148L250 244L286 148L358 148L277 364L223 364Z';

const PALETTES = {
  light: {
    mode: 'light',
    ground: '#f4ead4',
    surfaceSoft: '#efe4c5',
    inkText: '#0a0a0a',
    markDisc: '#0a0a0a',
    muted: '#5c5446',
    signal: '#f50000',
    signalInk: '#b80000',
    onSignal: '#0a0a0a',
    border: 'rgba(10,10,10,0.14)',
    borderStrong: 'rgba(10,10,10,0.22)',
    dotGrid: 'rgba(10,10,10,0.065)',
  },
  dark: {
    mode: 'dark',
    ground: '#0a0a0a',
    surfaceSoft: '#141414',
    inkText: '#e8dec5',
    markDisc: '#ffffff',
    muted: '#a69c86',
    signal: '#ff3838',
    signalInk: '#ff5a5a',
    onSignal: '#0a0a0a',
    border: 'rgba(232,222,197,0.14)',
    borderStrong: 'rgba(232,222,197,0.24)',
    dotGrid: 'rgba(232,222,197,0.065)',
  },
};

const FONT_MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const FONT_SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif";

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderMark(x, y, size, discFill, dotFill) {
  const scale = (size / 512).toFixed(6);
  return `<g transform="translate(${x}, ${y}) scale(${scale})">
    <path fill="${discFill}" fill-rule="evenodd" d="${MARK_PATH}"/>
    <circle cx="340" cy="337" r="27" fill="${dotFill}"/>
  </g>`;
}

function buildHeroSvg(p, { title, eyebrow, subtitle, pill, tags }) {
  const titleText = escapeXml(title);
  const eyebrowText = escapeXml(eyebrow);
  const subtitleText = escapeXml(subtitle);
  const pillText = escapeXml(pill);

  const titleSize = title.length > 20 ? 44 : 52;
  const pillWidth = Math.max(128, Math.round(pill.length * 7.6 + 34));
  const pillX = 1156 - pillWidth;
  const pillCenterX = Math.round(pillX + pillWidth / 2);

  // Compute non-overlapping tag positions along bottom footer strip
  const tagNodes = [];
  let cursorX = 44;
  for (let i = 0; i < Math.min(tags.length, 4); i += 1) {
    const label = tags[i].trim();
    if (!label) continue;
    if (i > 0) {
      tagNodes.push(`<circle cx="${cursorX}" cy="272" r="3" fill="${p.signal}"/>`);
      cursorX += 16;
    }
    tagNodes.push(
      `<text x="${cursorX}" y="276" font-family="${FONT_MONO}" font-size="11.5" font-weight="600" letter-spacing="1.2" fill="${p.muted}">${escapeXml(label)}</text>`
    );
    cursorX += Math.round(label.length * 8.4 + 16);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" width="1200" height="320" role="img" aria-label="${titleText} — ${subtitleText}">
  <defs>
    <clipPath id="hero-clip">
      <rect x="0.5" y="0.5" width="1199" height="319" rx="16"/>
    </clipPath>
    <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.15" fill="${p.dotGrid}"/>
    </pattern>
  </defs>

  <g clip-path="url(#hero-clip)">
    <rect width="1200" height="320" fill="${p.ground}"/>
    <rect width="1200" height="320" fill="url(#dot-grid)"/>
    <rect x="0" y="0" width="5" height="320" fill="${p.signal}"/>

    <!-- Top utility bar -->
    ${renderMark(44, 28, 26, p.markDisc, p.signal)}
    <text x="80" y="45" font-family="${FONT_MONO}" font-size="13" font-weight="700" letter-spacing="1.8" fill="${p.inkText}">VOANEVES<tspan fill="${p.signal}">.</tspan></text>
    <text x="176" y="45" font-family="${FONT_MONO}" font-size="13" fill="${p.muted}">/</text>
    <text x="194" y="45" font-family="${FONT_MONO}" font-size="12" font-weight="700" letter-spacing="1.5" fill="${p.signalInk}">${eyebrowText}</text>

    <rect x="${pillX}" y="26" width="${pillWidth}" height="28" rx="6" fill="${p.surfaceSoft}" stroke="${p.borderStrong}" stroke-width="1"/>
    <text x="${pillCenterX}" y="44" text-anchor="middle" font-family="${FONT_MONO}" font-size="11" font-weight="700" letter-spacing="1.1" fill="${p.muted}">${pillText}</text>

    <!-- Display title + subtitle -->
    <text x="44" y="154" font-family="${FONT_SANS}" font-size="${titleSize}" font-weight="800" letter-spacing="-1.6" fill="${p.inkText}">${titleText}<tspan fill="${p.signal}">.</tspan></text>
    <text x="44" y="198" font-family="${FONT_SANS}" font-size="19" font-weight="400" fill="${p.muted}">${subtitleText}</text>

    <!-- Bottom architectural metadata rail -->
    <line x1="44" y1="238" x2="1156" y2="238" stroke="${p.border}" stroke-width="1"/>
    ${tagNodes.join('\n    ')}

    <g transform="translate(996, 265)">
      <path d="M0 7 Q7 0 14 7 T28 7 T42 7 T56 7" fill="none" stroke="${p.signalInk}" stroke-width="2" stroke-linecap="round"/>
    </g>
    <text x="1156" y="276" text-anchor="end" font-family="${FONT_MONO}" font-size="12" font-weight="700" letter-spacing="1.2" fill="${p.inkText}">voaneves.com</text>
  </g>

  <rect x="0.5" y="0.5" width="1199" height="319" rx="16" fill="none" stroke="${p.border}" stroke-width="1"/>
</svg>
`;
}

function buildRuleSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 20" width="1200" height="20" role="presentation" aria-hidden="true">
  <line x1="0" y1="10" x2="566" y2="10" stroke="${p.border}" stroke-width="1"/>
  <line x1="582" y1="6" x2="582" y2="14" stroke="${p.borderStrong}" stroke-width="1"/>
  <circle cx="600" cy="10" r="3.5" fill="${p.signal}"/>
  <line x1="618" y1="6" x2="618" y2="14" stroke="${p.borderStrong}" stroke-width="1"/>
  <line x1="634" y1="10" x2="1200" y2="10" stroke="${p.border}" stroke-width="1"/>
</svg>
`;
}

function buildFooterSvg(p, lang) {
  const isPt = lang === 'pt';
  const tagline = isPt
    ? 'Sinal, não ruído. · Design systems, acessibilidade WCAG 2.2, GitOps e IA aplicada.'
    : 'Signal, not noise. · Design systems, WCAG 2.2 accessibility, GitOps & applied AI.';
  const ctaText = isPt ? 'CONSULTORIA · voaneves.com' : 'WORK TOGETHER · voaneves.com';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 116" width="1200" height="116" role="img" aria-label="VOANEVES. — ${escapeXml(tagline)}">
  <defs>
    <clipPath id="footer-clip">
      <rect x="0.5" y="0.5" width="1199" height="115" rx="14"/>
    </clipPath>
    <pattern id="footer-dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="${p.dotGrid}"/>
    </pattern>
  </defs>

  <g clip-path="url(#footer-clip)">
    <rect width="1200" height="116" fill="${p.surfaceSoft}"/>
    <rect width="1200" height="116" fill="url(#footer-dots)"/>
    <rect x="0" y="0" width="5" height="116" fill="${p.signal}"/>

    ${renderMark(36, 36, 44, p.markDisc, p.signal)}
    <text x="98" y="53" font-family="${FONT_MONO}" font-size="18" font-weight="700" letter-spacing="2.2" fill="${p.inkText}">VOANEVES<tspan fill="${p.signal}">.</tspan></text>
    <text x="98" y="79" font-family="${FONT_SANS}" font-size="14" fill="${p.muted}">${escapeXml(tagline)}</text>

    <rect x="866" y="36" width="298" height="44" rx="8" fill="${p.signal}"/>
    <text x="1015" y="63" text-anchor="middle" font-family="${FONT_MONO}" font-size="13" font-weight="700" letter-spacing="1" fill="${p.onSignal}">${escapeXml(ctaText)}</text>
  </g>

  <rect x="0.5" y="0.5" width="1199" height="115" rx="14" fill="none" stroke="${p.border}" stroke-width="1"/>
</svg>
`;
}

function parseCli(argv) {
  const args = { shared: null, hero: false, out: null, prefix: 'hero', title: '', eyebrow: '', subtitle: '', pill: '', tags: '' };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--shared') args.shared = next();
    else if (a === '--hero') args.hero = true;
    else if (a === '--out') args.out = next();
    else if (a === '--prefix') args.prefix = next();
    else if (a === '--title') args.title = next();
    else if (a === '--eyebrow') args.eyebrow = next();
    else if (a === '--subtitle') args.subtitle = next();
    else if (a === '--pill') args.pill = next();
    else if (a === '--tags') args.tags = next();
  }
  return args;
}

const args = parseCli(process.argv.slice(2));

if (args.shared) {
  const dir = path.resolve(args.shared);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'rule-light.svg'), buildRuleSvg(PALETTES.light), 'utf8');
  fs.writeFileSync(path.join(dir, 'rule-dark.svg'), buildRuleSvg(PALETTES.dark), 'utf8');
  fs.writeFileSync(path.join(dir, 'footer-light.svg'), buildFooterSvg(PALETTES.light, 'en'), 'utf8');
  fs.writeFileSync(path.join(dir, 'footer-dark.svg'), buildFooterSvg(PALETTES.dark, 'en'), 'utf8');
  fs.writeFileSync(path.join(dir, 'footer-pt-light.svg'), buildFooterSvg(PALETTES.light, 'pt'), 'utf8');
  fs.writeFileSync(path.join(dir, 'footer-pt-dark.svg'), buildFooterSvg(PALETTES.dark, 'pt'), 'utf8');
  console.log(`Generated shared rule + footer SVGs in ${dir}`);
}

if (args.hero) {
  if (!args.out || !args.title) {
    console.error('Usage: brand-readme.mjs --hero --out <dir> --title "..." --eyebrow "..." --subtitle "..." --pill "..." --tags "A,B,C,D"');
    process.exit(2);
  }
  const dir = path.resolve(args.out);
  fs.mkdirSync(dir, { recursive: true });
  const payload = {
    title: args.title,
    eyebrow: args.eyebrow || 'OPEN SOURCE',
    subtitle: args.subtitle || '',
    pill: args.pill || 'VOANEVES.',
    tags: args.tags ? args.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
  };
  const lightFile = path.join(dir, `${args.prefix}-light.svg`);
  const darkFile = path.join(dir, `${args.prefix}-dark.svg`);
  fs.writeFileSync(lightFile, buildHeroSvg(PALETTES.light, payload), 'utf8');
  fs.writeFileSync(darkFile, buildHeroSvg(PALETTES.dark, payload), 'utf8');
  console.log(`Generated ${args.prefix}-{light,dark}.svg in ${dir}`);
  console.log(`
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/brand/${args.prefix}-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="./assets/brand/${args.prefix}-light.svg" />
  <img alt="${args.title} — ${args.subtitle}" src="./assets/brand/${args.prefix}-light.svg" width="100%" />
</picture>`);
}
