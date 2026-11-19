#!/usr/bin/env node
/**
 * Zero-dependency mobile-first README SVG primitive generator for voaneves/* repositories.
 * Grounded in @voaneves/brand (Concept B "Sinal", Ink/Cream/Sinal palette).
 *
 * Strictly generates ONLY iconic/geometric primitives (mark, tight wordmark, divider rule)
 * so all copy, KPIs, badges, and CTAs stay native HTML/Markdown for crisp mobile legibility.
 */

import fs from 'node:fs';
import path from 'node:path';

const MARK_PATH =
  'M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0ZM142 148L214 148L250 244L286 148L358 148L277 364L223 364Z';

const PALETTES = {
  light: {
    markDisc: '#0a0a0a',
    ink: '#0a0a0a',
    signal: '#f50000',
    border: 'rgba(10,10,10,0.16)',
    tick: 'rgba(10,10,10,0.28)',
  },
  dark: {
    markDisc: '#ffffff',
    ink: '#e8dec5',
    signal: '#ff3838',
    border: 'rgba(232,222,197,0.16)',
    tick: 'rgba(232,222,197,0.30)',
  },
};

function buildMarkSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="VOANEVES. Concept B (Sinal) mark">
  <path fill="${p.markDisc}" fill-rule="evenodd" d="${MARK_PATH}"/>
  <circle cx="340" cy="337" r="27" fill="${p.signal}"/>
</svg>
`;
}

function buildWordmarkSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 68" width="440" height="68" role="img" aria-label="VOANEVES.">
  <text x="220" y="52" text-anchor="middle" font-family="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-weight="700" font-size="56" letter-spacing="6" fill="${p.ink}">VOANEVES<tspan fill="${p.signal}">.</tspan></text>
</svg>
`;
}

function buildRuleSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 20" width="1200" height="20" role="presentation" aria-hidden="true">
  <line x1="0" y1="10" x2="566" y2="10" stroke="${p.border}" stroke-width="1"/>
  <line x1="582" y1="6" x2="582" y2="14" stroke="${p.tick}" stroke-width="1"/>
  <circle cx="600" cy="10" r="3.5" fill="${p.signal}"/>
  <line x1="618" y1="6" x2="618" y2="14" stroke="${p.tick}" stroke-width="1"/>
  <line x1="634" y1="10" x2="1200" y2="10" stroke="${p.border}" stroke-width="1"/>
</svg>
`;
}

const args = process.argv.slice(2);
const idx = args.indexOf('--primitives');
const targetDir = idx >= 0 && args[idx + 1] ? path.resolve(args[idx + 1]) : null;

if (!targetDir) {
  console.error('Usage: node scripts/brand-readme.mjs --primitives <output-dir>');
  process.exit(2);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(path.join(targetDir, 'mark-light.svg'), buildMarkSvg(PALETTES.light), 'utf8');
fs.writeFileSync(path.join(targetDir, 'mark-dark.svg'), buildMarkSvg(PALETTES.dark), 'utf8');
fs.writeFileSync(path.join(targetDir, 'wordmark-light.svg'), buildWordmarkSvg(PALETTES.light), 'utf8');
fs.writeFileSync(path.join(targetDir, 'wordmark-dark.svg'), buildWordmarkSvg(PALETTES.dark), 'utf8');
fs.writeFileSync(path.join(targetDir, 'rule-light.svg'), buildRuleSvg(PALETTES.light), 'utf8');
fs.writeFileSync(path.join(targetDir, 'rule-dark.svg'), buildRuleSvg(PALETTES.dark), 'utf8');

console.log(`Generated 6 mobile-first brand primitives in ${targetDir}`);
