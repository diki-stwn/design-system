---
"serupa-ds": minor
---

- Changed: Icons: The icon font is cut to the icons the system uses (every name on the Foundations/Icons page and in the components and docs, about 270), so it drops from 990 KB to 55 KB. A name outside that set now shows as its letters: load `serupa-ds/fonts/icons-full.css` after `tokens.css` to get every Material Symbols icon (the full font is kept as `fonts/MaterialSymbolsRounded-Filled-full.woff2`).
- Changed: Icons: The icon font uses `font-display: block`, so an icon's name no longer flashes as a word while the font loads. Inter keeps `swap`.
