import { mkdir, readdir, copyFile } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { logger } from '@kookio/utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const styleArg = args.find(arg => arg.startsWith('--style='));
const allFlag = args.includes('--all');

const VALID_STYLES = ['filled', 'outlined', 'round', 'sharp', 'two-tone'];

const stylesToImport: string[] = allFlag
  ? [...VALID_STYLES]
  : styleArg
    ? [styleArg.split('=')[1]]
    : [];

if (stylesToImport.length === 0 || !stylesToImport.every(s => VALID_STYLES.includes(s))) {
  logger.error(`❌ Must use param --style=<style> or --all\nExemple:\n  --style=filled\n  --all\nAccepted styles: ${VALID_STYLES.join(', ')}`);
  process.exit(1);
}

async function importIconsForStyle(style: string) {
  const SOURCE_DIR = path.resolve(__dirname, `../../../node_modules/@material-design-icons/svg/${style}`);
  const DEST_DIR = path.resolve(__dirname, `../../../web/public/icons/material/${style}`);

  try {
    await mkdir(DEST_DIR, { recursive: true });
    const files = await readdir(SOURCE_DIR);

    let copied = 0;
    for (const file of files) {
      if (!file.endsWith('.svg')) continue;

      const src = path.join(SOURCE_DIR, file);
      const dest = path.join(DEST_DIR, file);

      await copyFile(src, dest);
      copied++;
    }

    logger.info(`✅ Copied ${copied} icons in folder 'icons/material/${style}'`);
  } catch (err) {
    logger.error(err, `❌ Error at import on style '${style}':`);
  }
}

(async () => {

  for (const style of stylesToImport) {
    await importIconsForStyle(style);
  }
})();