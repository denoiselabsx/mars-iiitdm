#!/usr/bin/env node
// One-shot pipeline: curate the keepers from mars_image_drive/, convert HEIC if needed,
// resize to 3 widths, write webp + jpg fallback into public/gallery/* and public/alumni/*.
//
// Run once: `node scripts/process-images.mjs`
// Re-runs are idempotent (skips files that already exist).

import { mkdir, copyFile, access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'mars_image_drive');

// ── Curated keepers (4–5 per event) ────────────────────────────────────────
// Format: [eventSlug, srcRelativeToSRC/<DenoiseLabs|Alumni>, outputBaseName]
const EVENTS = [
  // IRC 2024 — anchor / process / work / action / grit
  ['irc-2024', 'Denoise Labs/IRC 2024/Copy of IMG_20240128_113547.jpg',     '01-team-podium'],
  ['irc-2024', 'Denoise Labs/IRC 2024/Copy of IMG_20240127_171925.jpg',     '02-pit-overhead'],
  ['irc-2024', 'Denoise Labs/IRC 2024/Copy of IMG_20240127_101840.jpg',     '03-rover-judges'],
  ['irc-2024', 'Denoise Labs/IRC 2024/Copy of PXL_20240125_051530870.jpg',  '04-rover-motion'],
  ['irc-2024', 'Denoise Labs/IRC 2024/Copy of IMG_20240127_083519.jpg',     '05-under-rover'],

  // IRC 2025 — anchor / cinematic / camaraderie / work / action
  ['irc-2025', 'Denoise Labs/IRC 2025/Copy of IMG_2367.HEIC',               '01-team-sunset'],
  ['irc-2025', 'Denoise Labs/IRC 2025/Copy of IMG_2025.HEIC',               '02-rover-arch'],
  ['irc-2025', 'Denoise Labs/IRC 2025/Copy of IMG_1916.HEIC',               '03-varsity-steps'],
  ['irc-2025', 'Denoise Labs/IRC 2025/Copy of IMG_2007.HEIC',               '04-rover-profile'],
  ['irc-2025', 'Denoise Labs/IRC 2025/Copy of IMG_1985.HEIC',               '05-rover-driving'],

  // IRC 2026 — heritage / mound / celebration / maintenance / award
  ['irc-2026', 'Denoise Labs/IRC 2026/Copy of WhatsApp Image 2026-03-03 at 1.13.54 PM.jpeg',     '01-rover-heritage'],
  ['irc-2026', 'Denoise Labs/IRC 2026/Copy of 20260130_145236.jpg',                              '02-mound-climb'],
  ['irc-2026', 'Denoise Labs/IRC 2026/Copy of WhatsApp Image 2026-03-03 at 1.12.04 PM.jpeg',     '03-team-selfie'],
  ['irc-2026', 'Denoise Labs/IRC 2026/Copy of WhatsApp Image 2026-03-03 at 1.10.41 PM.jpeg',     '04-maintenance'],
  ['irc-2026', 'Denoise Labs/IRC 2026/Copy of WhatsApp Image 2026-03-03 at 1.13.57 PM (1).jpeg', '05-award-stage'],

  // IROC 2024 — team / scale / ISRO / arena / atmosphere
  ['iroc-2024', 'Denoise Labs/IROC 2024/Copy of 1000065746.heic',         '01-team-backdrop'],
  ['iroc-2024', 'Denoise Labs/IROC 2024/Copy of Copy of 1000046091.jpg',  '02-rover-lineup'],
  ['iroc-2024', 'Denoise Labs/IROC 2024/Copy of IMG20240823195355.jpg',   '03-rover-isro'],
  ['iroc-2024', 'Denoise Labs/IROC 2024/Copy of 1000065725.jpg',          '04-arena-action'],
  ['iroc-2024', 'Denoise Labs/IROC 2024/Copy of IMG20240822185054.jpg',   '05-lunar-diorama'],

  // Caterpillar 2026 — all 3
  ['caterpillar-2026', 'Denoise Labs/Caterpillar 2026/Copy of WhatsApp Image 2026-03-03 at 1.13.49 PM.jpeg',     '01-arch'],
  ['caterpillar-2026', 'Denoise Labs/Caterpillar 2026/Copy of WhatsApp Image 2026-03-03 at 1.13.52 PM (1).jpeg', '02-group'],
  ['caterpillar-2026', 'Denoise Labs/Caterpillar 2026/Copy of WhatsApp Image 2026-03-03 at 1.13.52 PM (2).jpeg', '03-candid'],
];

// Alumni: source folder name (in mars_image_drive/Alumni/) → output basename (kebab-case name)
// Uses the first image found in each folder.
const ALUMNI_FOLDERS = [
  ['Ayush Kumar',                'ayush-kumar'],
  ['Divyanshu Pandey',           'divyanshu-pandey'],
  ['Manjari Shrivastava',        'manjari-shrivastava'],
  ['Phanish Vajhala',            'phanish-vajhala'],
  ['Rahul Rajak',                'rahul-rajak'],
  ['Rajrajeshwer Gupta',         'rajrajeshwer-gupta'],
  ['Sai Harshith Raghupatruni',  'sai-harshith-raghupatruni'],
  ['Shubh Khandelwal',           'shubh-khandelwal'],
  ['Vignesh Aravindh B',         'vignesh-aravindh-b'],
  ['Aravind Ananthakrishnan',    'aravind-ananthakrishnan'],
  ['Manas Narayan',              'manas-narayan'],
  ['Saikat Paul',                'saikat-paul'],
  ['Samrat Chhabra',             'samrat-chhabra'],
  ['Sibi M',                     'sibi-m'],
  ['Vashist Managari',           'vashist-managari'],
  ['Chandan Kumar',              'chandan-kumar'],
  ['JAGADEESHAN S',              'jagadeeshan-s'],
  ['Pullipudi Sri Sahil',        'pullipudi-sri-sahil'],
  ['RADHIKA MITTAL',             'radhika-mittal'],
  ['Vishnu Kumar',               'vishnu-kumar'],
  ['Yash Kumar Sahu',            'yash-kumar-sahu'],
  ['Ram Guguloth',               'ram-guguloth'],
  ['Anirudh Govindarajan',       'anirudh-govindarajan'],
];

const SIZES = { thumb: 480, grid: 1024, hero: 1920 };

async function exists(p) { try { await access(p); return true; } catch { return false; } }

// Use Python+pillow_heif for HEIC, ImageMagick `convert` for everything else.
async function processOne(srcAbs, outDir, basename) {
  await mkdir(outDir, { recursive: true });
  const isHeic = /\.heic$/i.test(srcAbs);
  for (const [label, w] of Object.entries(SIZES)) {
    const outWebp = path.join(outDir, `${basename}-${label}.webp`);
    const outJpg  = path.join(outDir, `${basename}-${label}.jpg`);
    if (await exists(outWebp) && await exists(outJpg)) continue;

    if (isHeic) {
      // single python call writes both formats at this width
      const py = `
import sys
from PIL import Image, ImageOps
import pillow_heif
pillow_heif.register_heif_opener()
src, w, outwebp, outjpg = sys.argv[1:5]
w = int(w)
im = ImageOps.exif_transpose(Image.open(src))
if im.mode != "RGB": im = im.convert("RGB")
ratio = w / im.width
im = im.resize((w, max(1, round(im.height * ratio))), Image.LANCZOS)
im.save(outwebp, "WEBP", quality=82, method=6)
im.save(outjpg, "JPEG", quality=85, optimize=True, progressive=True)
print("ok")
`.trim();
      await exec('python3', ['-c', py, srcAbs, String(w), outWebp, outJpg]);
    } else {
      // JPG/PNG/JPEG → ImageMagick (faster than spawning python)
      // -auto-orient handles rotated cellphone photos
      await exec('convert', [srcAbs, '-auto-orient', '-resize', `${w}x${w}>`, '-quality', '82', outWebp]);
      await exec('convert', [srcAbs, '-auto-orient', '-resize', `${w}x${w}>`, '-quality', '85', '-interlace', 'Plane', outJpg]);
    }
    process.stdout.write('.');
  }
}

async function main() {
  console.log('▶ Processing event galleries…');
  for (const [event, rel, basename] of EVENTS) {
    const src = path.join(SRC, rel);
    if (!await exists(src)) { console.error(`\n  ✗ MISSING: ${rel}`); continue; }
    const outDir = path.join(ROOT, 'public', 'gallery', event);
    process.stdout.write(`  ${event}/${basename} `);
    await processOne(src, outDir, basename);
    console.log(' ✓');
  }

  console.log('\n▶ Processing alumni headshots…');
  const { readdir } = await import('node:fs/promises');
  for (const [folder, basename] of ALUMNI_FOLDERS) {
    const folderAbs = path.join(SRC, 'Alumni', folder);
    if (!await exists(folderAbs)) { console.error(`  ✗ MISSING folder: ${folder}`); continue; }
    const files = (await readdir(folderAbs)).filter(f => /\.(jpe?g|png|heic)$/i.test(f));
    if (!files.length) { console.error(`  ✗ EMPTY: ${folder}`); continue; }
    const src = path.join(folderAbs, files[0]);
    const outDir = path.join(ROOT, 'public', 'alumni');
    process.stdout.write(`  ${basename} `);
    await processOne(src, outDir, basename);
    console.log(' ✓');
  }

  console.log('\n✔ Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
