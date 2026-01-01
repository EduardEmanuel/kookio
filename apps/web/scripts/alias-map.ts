import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Alias = Record<string, string>;

const loadTsconfig = () => {
  const root = process.cwd();
  const tsconfigPath = resolve(root, 'tsconfig.base.json');
  const ts = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
  const baseUrl = resolve(root, ts.compilerOptions?.baseUrl ?? '.');
  const paths: Record<string, string[]> = ts.compilerOptions?.paths ?? {};

  return { baseUrl, paths };
};

const normalizeAlias = (
  paths: Record<string, string[]>,
  baseUrl: string,
  mapper: (p: string) => string,
): Alias => {
  const out: Alias = {};

  for (const [key, arr] of Object.entries(paths)) {
    if (!arr?.length) continue;
    const bare = key.replace(/\/\*$/, '');
    // only first mapping is enough for our libs
    const first = arr[0].replace(/\/\*$/, '');
    out[bare] = resolve(baseUrl, mapper(first));
  }
  return out;
};

// For Nitro, we also point to source; we'll force-inline these in nitro.config.ts.
export const aliasForNitro = (): Alias => {
  const { baseUrl, paths } = loadTsconfig();

  return normalizeAlias(paths, baseUrl, (p) => p);
};
