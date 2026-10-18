// Icons: every name on the Foundations/Icons page (docs/icon-names.json) is a real Material Symbols icon in the
// shipped font: it draws as one square glyph, not as the name spelled out in letters. The shipped font is cut to
// the names the system uses (tools/icons/subset.py), so every Material Symbols name written as a string in src/,
// docs/ and .storybook/ must draw in it too, and fonts/icons-full.css must bring back every other name.
//   node tools/test/icon-names.mjs
import fs from 'node:fs';
import path from 'node:path';
import { read, writePage, browser, cleanup, report, PROJECT } from './lib.mjs';

const groups = JSON.parse(read('docs/icon-names.json'));
delete groups.$description;
const names = Object.values(groups).flat();

// Strings in the source that look like icon names; the full font decides which ones are.
const files = (d) => fs.readdirSync(path.join(PROJECT, d), { recursive: true }).map((f) => path.join(d, String(f))).filter((f) => /\.(tsx?|mdx?|html)$/.test(f));
const strings = new Set();
for (const f of ['src', 'docs', '.storybook'].flatMap(files))
  for (const m of read(f).matchAll(/["'`]([a-z][a-z0-9_]{1,40})["'`]/g)) strings.add(m[1]);
const candidates = [...strings].filter((s) => !names.includes(s));

// Measured in a plain span: the Icon component's box is fixed at 1em, which would hide a name drawn as letters.
const FULL = `@font-face { font-family: "Full Symbols"; src: url("${path.join(PROJECT, 'fonts/MaterialSymbolsRounded-Filled-full.woff2')}") format("woff2"); font-display: block; }`;
const probe = (cls, list) => list.map((n) => `<span class="probe ${cls}" data-n="${n}">${n}</span>`).join(' ');
const APP = `<style>${FULL} .probe { font-family: var(--font-icon); font-size: 24px; line-height: 1; white-space: nowrap; font-feature-settings: "liga"; display: inline-block; } .full { font-family: "Full Symbols"; }</style>
<div id="root" style="padding:16px">${probe('page', names)} ${probe('src', candidates)} ${probe('full', candidates)}</div>`;
const narrow = (sel) => [...document.querySelectorAll(sel)].filter((e) => Math.round(e.getBoundingClientRect().width) <= 26).map((e) => e.dataset.n);

const b = await browser();
const R = [];
const t = (name, ok, detail) => R.push({ name, ok: !!ok, detail });
const p = await b.newPage();
await p.goto(writePage('icon-names.html', APP));
await p.evaluate(() => Promise.all([document.fonts.load('24px "Full Symbols"'), document.fonts.ready])); await p.waitForTimeout(300);
const wide = await p.evaluate(() => [...document.querySelectorAll('.page')].filter((e) => Math.round(e.getBoundingClientRect().width) > 26).map((e) => e.dataset.n));
t(`all ${names.length} names on the Icons page draw as single 24px glyphs`, wide.length === 0, 'not icons: ' + wide.join(', '));
t('no name is listed twice', new Set(names).size === names.length);
const [inFull, inShipped] = await p.evaluate(`[(${narrow})('.full'), (${narrow})('.src')]`);
const lost = inFull.filter((n) => !inShipped.includes(n));
t(`the ${inFull.length} other icon names used in src/, docs/ and .storybook/ draw in the shipped font`, inFull.length > 0 && lost.length === 0, 'missing (run python3 tools/icons/subset.py): ' + lost.join(', '));
const kb = fs.statSync(path.join(PROJECT, 'fonts/MaterialSymbolsRounded-Filled.woff2')).size / 1024;
t('the shipped icon font is the cut one (under 100 KB)', kb < 100, `${Math.round(kb)} KB`);

// fonts/icons-full.css after the tokens brings back a name the cut font doesn't have.
const OTHER = 'rocket_launch';
const q = await b.newPage();
await q.goto(writePage('icon-full.html', `<span class="probe" data-n="${OTHER}">${OTHER}</span>`, { extraHead: `<link rel="stylesheet" href="../fonts/icons-full.css"><style>.probe { font-family: var(--font-icon); font-size: 24px; line-height: 1; white-space: nowrap; display: inline-block; }</style>` }));
await q.evaluate(() => document.fonts.ready); await q.waitForTimeout(300);
const fullW = await q.evaluate(() => Math.round(document.querySelector('.probe').getBoundingClientRect().width));
t(`fonts/icons-full.css brings back names the cut font leaves out ("${OTHER}" draws as one glyph)`, !names.includes(OTHER) && !inShipped.includes(OTHER) && fullW <= 26, `${fullW}px`);
await b.close();
cleanup();
process.exit(report('Icon names', R) ? 0 : 1);
