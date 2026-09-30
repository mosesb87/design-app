"""Subset the OFL variable fonts to the characters and axis ranges this site uses.
Run once after changing fonts:  python3 scripts/fonts/subset.py
Outputs woff2 files to src/fonts/ (committed, with their OFL licenses)."""
import os, shutil
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
NM = os.path.join(ROOT, 'node_modules', '@fontsource-variable')
OUT = os.path.join(ROOT, 'src', 'fonts')
UNICODES = (
    list(range(0x20, 0x7F)) + [0xA0, 0xA9, 0xAE, 0xB0, 0xB7, 0xE0, 0xE1, 0xE2, 0xE4, 0xE5, 0xE7, 0xE8, 0xE9, 0xEA, 0xEB, 0xED, 0xF1, 0xF3, 0xF4, 0xF6, 0xF8, 0xFA, 0xFC, 0xC9] +
    [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x2032, 0x2033, 0x20AC, 0x2122,
     0x2190, 0x2191, 0x2192, 0x2193, 0x2196, 0x2197, 0x2198, 0x2199, 0x2212, 0x00D7, 0x2713, 0x2715, 0x25CF, 0x2044, 0x2248, 0x2260, 0x2264, 0x2265]
)
JOBS = [
    # (package, source file, output name, axis limits)
    ('hubot-sans', 'hubot-sans-latin-wdth-normal.woff2', 'hubot-sans-display.woff2', {'wght': (500, 900), 'wdth': (75, 110)}),
    ('mona-sans', 'mona-sans-latin-wght-normal.woff2', 'mona-sans-text.woff2', {'wght': (380, 700)}),
    ('mona-sans', 'mona-sans-latin-wght-italic.woff2', 'mona-sans-text-italic.woff2', {'wght': (380, 600)}),
    ('azeret-mono', 'azeret-mono-latin-wght-normal.woff2', 'azeret-mono.woff2', {'wght': (400, 600)}),
]
os.makedirs(OUT, exist_ok=True)
for pkg, src, dst, limits in JOBS:
    path = os.path.join(NM, pkg, 'files', src)
    font = TTFont(path)
    axes = {a.axisTag for a in font['fvar'].axes}
    font = instancer.instantiateVariableFont(font, {k: v for k, v in limits.items() if k in axes})
    # Round-trip through a compile so every glyph has complete variation data before subsetting.
    import io
    buf = io.BytesIO(); font.flavor = None; font.save(buf); buf.seek(0); font = TTFont(buf)
    if 'gvar' in font:
        gvar = font['gvar']
        for g in font.getGlyphOrder():
            if g not in gvar.variations:
                gvar.variations[g] = []
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.drop_tables += ['DSIG']
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=UNICODES)
    sub.subset(font)
    out = os.path.join(OUT, dst)
    font.flavor = 'woff2'
    font.save(out)
    print(f'{dst:32s} {os.path.getsize(path)/1024:6.1f} KB -> {os.path.getsize(out)/1024:6.1f} KB')
    lic = os.path.join(NM, pkg, 'LICENSE')
    shutil.copy(lic, os.path.join(OUT, f'OFL-{pkg}.txt'))
