import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineNitroModule } from 'nitropack/kit';

type Alias = Record<string, string>;

const aliasForNitro = (): Alias => {
  const root = process.cwd();
  const tsconfigPath = resolve(root, 'tsconfig.base.json');
  const ts = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
  const baseUrl = resolve(root, ts.compilerOptions?.baseUrl ?? '.');
  const paths: Record<string, string[]> = ts.compilerOptions?.paths ?? {};

  const out: Alias = {};
  for (const [key, arr] of Object.entries(paths)) {
    if (!arr?.length) continue;
    const bare = key.replace(/\/\*$/, '');
    const first = arr[0].replace(/\/\*$/, '');
    out[bare] = resolve(baseUrl, first);
  }
  return out;
};

export default defineNitroModule({
  setup: (nitro) => {
    nitro.options.alias = {
      ...(nitro.options.alias ?? {}),
      ...aliasForNitro(),
    };
  },
});
