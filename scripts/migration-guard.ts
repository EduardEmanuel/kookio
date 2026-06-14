import { promises as fs } from 'fs';
import { join } from 'path';

import { logger } from '@kookio/server-logger';

const ROOT = 'libs/prisma-client/migrations';
const NEEDLE = 'crdb_internal_region';

let found = false;

const walk = async (dir: string) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name === 'migration.sql') {
      const text = await fs.readFile(p, 'utf8');
      if (text.includes(NEEDLE)) {
        logger.error(`❌ Unsafe migration: ${p} touches ${NEEDLE}`);
        found = true;
      }
    }
  }
};

(async () => {
  try {
    await walk(ROOT);
    if (found) {
      process.exit(1);
    } else {
      logger.info('✅ Migration guard passed');
      process.exit(0);
    }
  } catch (err) {
    logger.error('❌ Migration guard errored:', err);
    process.exit(2);
  }
})();
