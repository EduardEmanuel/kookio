/*
 * Render the PWA icon set from a single SVG source.
 *
 * Outputs (under apps/web/public/icons/pwa/):
 *   - icon-192.png, icon-512.png            (manifest `purpose: any`)
 *   - icon-maskable-192.png, icon-maskable-512.png
 *                                            (manifest `purpose: maskable`)
 *   - apple-touch-icon.png                   (iOS Add-to-Home-Screen, 180x180)
 *   - splash-iphone-{13,11,se}.png           (iOS apple-touch-startup-image)
 *
 * "Maskable" variants pad the icon to ~80% of the canvas and fill the
 * remainder with the background tone so Android's adaptive-icon mask can
 * crop without clipping the artwork.
 *
 * Run via `npm run build:pwa-icons`. Commit the SVG source and PNG
 * outputs together; the script is reproducible from the SVG.
 */

import * as path from 'node:path';
import * as fs from 'node:fs/promises';

import sharp from 'sharp';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(REPO_ROOT, 'apps/web/public/icons/pwa/source.svg');
const OUT_DIR = path.join(REPO_ROOT, 'apps/web/public/icons/pwa');

// Matches `--md-sys-color-surface` light: rgb(255 248 246).
const BG_COLOR = '#fff8f6';
// Safe zone for maskable icons — Android's adaptive-icon mask crops a
// circle of ~80% diameter, so the artwork has to live inside that area.
const MASKABLE_INNER_RATIO = 0.8;
// Icon-on-splash fraction (icon takes 40% of the shorter splash side).
const SPLASH_ICON_RATIO = 0.4;

const renderNormal = async (size: number, outName: string): Promise<void> => {
  await sharp(SOURCE, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(path.join(OUT_DIR, outName));
};

const renderMaskable = async (size: number, outName: string): Promise<void> => {
  const inner = Math.round(size * MASKABLE_INNER_RATIO);
  const iconBuffer = await sharp(SOURCE, { density: 384 })
    .resize(inner, inner)
    .png()
    .toBuffer();
  const margin = Math.round((size - inner) / 2);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: iconBuffer, left: margin, top: margin }])
    .png()
    .toFile(path.join(OUT_DIR, outName));
};

const renderSplash = async (
  width: number,
  height: number,
  outName: string,
): Promise<void> => {
  const iconSize = Math.round(Math.min(width, height) * SPLASH_ICON_RATIO);
  const iconBuffer = await sharp(SOURCE, { density: 384 })
    .resize(iconSize, iconSize)
    .png()
    .toBuffer();
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: BG_COLOR,
    },
  })
    .composite([{ input: iconBuffer, gravity: 'center' }])
    .png()
    .toFile(path.join(OUT_DIR, outName));
};

const main = async (): Promise<void> => {
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log('Rendering app icons...');
  await renderNormal(192, 'icon-192.png');
  await renderNormal(512, 'icon-512.png');
  await renderMaskable(192, 'icon-maskable-192.png');
  await renderMaskable(512, 'icon-maskable-512.png');
  await renderNormal(180, 'apple-touch-icon.png');

  console.log('Rendering iOS splash screens...');
  // iPhone 13 / 14 Pro / 15 Pro range (1170×2532).
  await renderSplash(1170, 2532, 'splash-iphone-13.png');
  // iPhone 11 / XR (828×1792).
  await renderSplash(828, 1792, 'splash-iphone-11.png');
  // iPhone SE (750×1334).
  await renderSplash(750, 1334, 'splash-iphone-se.png');

  console.log('Done.');
};

void main();
