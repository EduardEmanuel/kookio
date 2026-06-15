import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import * as path from 'node:path';

import { logger } from './utils';

/**
 * Generates the dbdocs ER-diagram source (`libs/prisma-client/dbml/kookio.dbml`)
 * from `schema.prisma` and post-processes it into valid DBML.
 *
 * Why a script rather than a plain `generator dbml {}` in the schema:
 *
 *  1. prisma-dbml-generator emits each `///` doc-comment as a `note`, but its
 *     output is invalid for dbdocs in two ways — multi-line comments become
 *     notes containing LITERAL newlines, and apostrophes are emitted as `\'`.
 *     dbdocs' parser accepts neither ("Invalid newline", "Unexpected token \").
 *     We wrap every note value in DBML triple-quotes (`'''…'''`), which carry
 *     newlines and apostrophes verbatim, and undo the `\'` escape.
 *
 *  2. Because the raw output is invalid until post-processed, the generator is
 *     deliberately kept OUT of `schema.prisma`: a normal `prisma generate`
 *     (build, migrate) must never produce this file. It is injected into a
 *     throwaway schema here instead, so only `npm run gen:dbml` writes it.
 */

const ROOT = path.resolve(import.meta.dirname, '..');
const SCHEMA = path.join(ROOT, 'libs/prisma-client/schema.prisma');
const TMP = path.join(ROOT, 'libs/prisma-client/.dbml-schema.prisma');
const OUT = path.join(ROOT, 'libs/prisma-client/dbml/kookio.dbml');

// Throwaway schema: the real datasource + models/enums, with the generators
// swapped out for just the dbml one (its `./dbml` output resolves next to the
// schema file, i.e. libs/prisma-client/dbml/).
const source = readFileSync(SCHEMA, 'utf8');
const withoutGenerators = source.replace(
  /generator\s+\w+\s*\{[\s\S]*?\n\}\n?/g,
  '',
);
const dbmlGenerator =
  'generator dbml {\n' +
  '  provider   = "prisma-dbml-generator"\n' +
  '  output     = "./dbml"\n' +
  '  outputName = "kookio.dbml"\n' +
  '}\n\n';
writeFileSync(TMP, dbmlGenerator + withoutGenerators);

try {
  execFileSync('npx', ['prisma', 'generate', '--schema', TMP], {
    cwd: ROOT,
    stdio: 'inherit',
  });
} finally {
  rmSync(TMP, { force: true });
}

// Make the notes valid DBML: wrap each `note:` / `Note:` value in triple-quotes
// and unescape the generator's `\'` (dbdocs rejects backslash escapes; inside
// triple-quotes none are needed). The value matcher tolerates the `\'` escapes
// and embedded newlines the raw output contains.
const raw = readFileSync(OUT, 'utf8');
const fixed = raw.replace(
  /([Nn]ote: )'((?:[^'\\]|\\.)*)'/g,
  (_match, label: string, value: string) =>
    `${label}'''${value.replace(/\\'/g, "'")}'''`,
);
writeFileSync(OUT, fixed);

logger.info('✔ Generated valid DBML at libs/prisma-client/dbml/kookio.dbml');
