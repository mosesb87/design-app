// Dev helper: tile screenshots into one contact sheet. Usage: node scripts/sheet.mjs out.jpg w cols file...
import sharp from 'sharp';
const [, , out, w = '480', cols = '3', ...files] = process.argv;
const W = +w, C = +cols;
const metas = await Promise.all(files.map((f) => sharp(f).metadata()));
const H = Math.round(W * (metas[0].height / metas[0].width));
const rows = Math.ceil(files.length / C);
const comps = await Promise.all(files.map(async (f, i) => ({ input: await sharp(f).resize(W, H, { fit: 'cover', position: 'top' }).toBuffer(), left: (i % C) * (W + 6), top: Math.floor(i / C) * (H + 6) })));
await sharp({ create: { width: C * (W + 6), height: rows * (H + 6), channels: 3, background: '#666' } }).composite(comps).jpeg({ quality: 82 }).toFile(out);
