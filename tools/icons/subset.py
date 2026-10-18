"""Cuts the icon font down to the icons the system and its docs use.

    python3 tools/icons/subset.py           write fonts/MaterialSymbolsRounded-Filled.woff2
    python3 tools/icons/subset.py --list    print the names it keeps

The full Material Symbols font (fonts/MaterialSymbolsRounded-Filled-full.woff2, about 1 MB) holds some 3,800
icons; a page needs a few dozen. This keeps every name on the Foundations/Icons page (docs/icon-names.json) and
every Material Symbols name written as a string in src/, docs/ and .storybook/ (so a component, story or guide
that uses an icon keeps it), and drops the rest. tools/test/icon-names.mjs checks that each of those draws as an
icon in the cut font. Projects that need any name load fonts/icons-full.css after tokens.css.

Needs fontTools and brotli (python3 -m pip install fonttools brotli). Run it after adding an icon name anywhere.
"""
import glob, json, os, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont

P = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
FULL = os.path.join(P, 'fonts', 'MaterialSymbolsRounded-Filled-full.woff2')
OUT = os.path.join(P, 'fonts', 'MaterialSymbolsRounded-Filled.woff2')
CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789_'


def ligatures(font):
    """Every icon name in the font, mapped to its glyph."""
    rev = {g: chr(u) for u, g in font.getBestCmap().items()}
    out = {}
    for lookup in font['GSUB'].table.LookupList.Lookup:
        for st in lookup.SubTable:
            if st.LookupType == 7:
                st = st.ExtSubTable
            if getattr(st, 'LookupType', None) != 4:
                continue
            for first, ligs in st.ligatures.items():
                for lig in ligs:
                    out[rev.get(first, '?') + ''.join(rev.get(c, '?') for c in lig.Component)] = lig.LigGlyph
    return out


def wanted(names):
    """The names on the Icons page, and every icon name written as a string in the source and docs."""
    groups = json.load(open(os.path.join(P, 'docs', 'icon-names.json')))
    groups.pop('$description', None)
    keep = {n for g in groups.values() for n in g}
    files = [f for d in ('src', 'docs', '.storybook') for f in glob.glob(os.path.join(P, d, '**', '*'), recursive=True)
             if f.endswith(('.tsx', '.ts', '.mdx', '.md', '.html'))]
    for f in files:
        for m in re.finditer(r'''["'`]([a-z][a-z0-9_]{1,40})["'`]''', open(f, encoding='utf-8', errors='ignore').read()):
            if m.group(1) in names:
                keep.add(m.group(1))
    missing = sorted(n for n in keep if n not in names)
    if missing:
        sys.exit('Not Material Symbols names (docs/icon-names.json): ' + ', '.join(missing))
    return sorted(keep)


def main():
    font = TTFont(FULL)
    names = ligatures(font)
    keep = wanted(names)
    if '--list' in sys.argv:
        print('\n'.join(keep))
        return
    cmap = font.getBestCmap()
    opts = subset.Options()
    opts.layout_features = ['liga', 'rlig', 'calt', 'ccmp']
    opts.layout_closure = False          # keep only the ligatures of the names kept, not every name their letters spell
    opts.flavor = 'woff2'
    opts.name_IDs = ['*']
    opts.name_languages = ['*']
    s = subset.Subsetter(opts)
    s.populate(glyphs=[cmap[ord(c)] for c in CHARS if ord(c) in cmap] + [names[n] for n in keep], unicodes=[ord(c) for c in CHARS])
    s.subset(font)
    font.flavor = 'woff2'
    font.save(OUT)
    print(f'Wrote fonts/MaterialSymbolsRounded-Filled.woff2: {len(keep)} icons, {os.path.getsize(OUT) // 1024} KB '
          f'(the full font is {os.path.getsize(FULL) // 1024} KB)')


if __name__ == '__main__':
    main()
