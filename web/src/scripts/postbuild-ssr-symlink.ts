import * as fs from 'fs';
import * as path from 'path';
import { loadConfig, createMatchPath, ConfigLoaderSuccessResult } from 'tsconfig-paths';

// import { logger } from '../../../../libs/shared/utils/src/index';
import { logger } from '@kookio/utils';

const tsconfigPath = path.resolve(__dirname, '../../../tsconfig.base.json');
const nodeModulesDir = path.resolve(__dirname, '../../../node_modules');

const { absoluteBaseUrl, paths } = loadConfig(tsconfigPath) as ConfigLoaderSuccessResult;

if (!absoluteBaseUrl || !paths) {
  logger.error('❌ Failed to load tsconfig paths.');
  process.exit(1);
}

const matchPath = createMatchPath(absoluteBaseUrl, paths);
const rawInput = process.argv[2];
const aliasesToFix = rawInput
  ? rawInput.split(',').map((a) => a.trim()).filter(Boolean)
  : Object.keys(paths); // Fix all if no input

logger.debug(`🔧 Creating symlinks for: ${aliasesToFix.join(', ')}`);

for (const alias of aliasesToFix) {
  const aliasWithoutWildcard = alias.replace(/\*$/, '');
  const resolvedPath = matchPath(aliasWithoutWildcard);

  if (!resolvedPath) {
    logger.warn(`⚠️  Skipping ${alias} — could not resolve path.`);
    continue;
  }

  const symlinkTarget = path.resolve(nodeModulesDir, aliasWithoutWildcard);

  try {
    fs.rmSync(symlinkTarget, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(symlinkTarget), { recursive: true });
    fs.symlinkSync(resolvedPath, symlinkTarget, 'dir');
    logger.info(`✅ Linked ${aliasWithoutWildcard} → ${resolvedPath}`);
  } catch (err) {
    logger.error(err, `❌ Failed to link ${aliasWithoutWildcard}:`);
  }
}
