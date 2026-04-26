import { readFile } from 'node:fs/promises';
import { mkdir, rm } from 'node:fs/promises';
import { spawn, type SpawnOptions } from 'node:child_process';
import path from 'node:path';

import dotenv from 'dotenv';

import { logger } from './utils';

const TMP_DIR = path.resolve(process.cwd(), 'tmp');
const ENV_FILE = path.join(TMP_DIR, 'kookio.env');

type ParsedArgs = {
  vercelEnv: string;
  team: string | undefined;
  token: string | undefined;
  yes: boolean;
  cmd: string[];
};

const parseArgs = (argv: string[]): ParsedArgs => {
  const out: ParsedArgs = {
    vercelEnv: 'development',
    team: undefined,
    token: undefined,
    yes: true,
    cmd: [],
  };

  const pass: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];

    if (a === '--') {
      out.cmd = argv.slice(i + 1);
      break;
    }

    if (a.startsWith('--env=')) out.vercelEnv = a.slice('--env='.length);
    else if (a === '--env') out.vercelEnv = argv[++i] ?? 'development';
    else if (a.startsWith('--team=')) out.team = a.slice('--team='.length);
    else if (a === '--team') out.team = argv[++i];
    else if (a.startsWith('--token=')) out.token = a.slice('--token='.length);
    else if (a === '--token') out.token = argv[++i];
    else if (a === '--no-yes') out.yes = false;
    else pass.push(a);
  }

  if (out.cmd.length === 0 && pass.length) out.cmd = pass;

  return out;
};

const run = (
  cmd: string,
  args: string[],
  opts: SpawnOptions = {},
): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });

const main = async (): Promise<void> => {
  const { vercelEnv, team, token, yes, cmd } = parseArgs(process.argv.slice(2));

  if (!cmd.length) {
    logger.error(
      [
        'Usage:',
        '  tsx ./scripts/with-vercel-env.ts --env=preview -- <command...>',
        'Examples:',
        '  npm run with:env -- --env=development -- nx serve web',
        '  npm run with:env -- --env=preview -- nx e2e web-e2e',
        '  npm run with:env -- --env=production -- nx migrate-deploy prisma-client',
      ].join('\n'),
    );
    process.exit(1);
  }

  await mkdir(TMP_DIR, { recursive: true });

  const cleanup = async (): Promise<void> => {
    try {
      await rm(ENV_FILE, { force: true });
    } catch (error) {
      logger.error('❌ Failed to cleanup env file:', error);
    }
  };

  const onSignal = async (): Promise<void> => {
    await cleanup();
    process.exit(130);
  };

  process.once('SIGINT', onSignal);
  process.once('SIGTERM', onSignal);

  try {
    const vercelArgs = ['env', 'pull', ENV_FILE, '--environment', vercelEnv];

    if (yes) vercelArgs.push('--yes');
    if (team) vercelArgs.push('--scope', team);
    if (token) vercelArgs.push('--token', token);

    await run('vercel', vercelArgs);

    const raw = await readFile(ENV_FILE, 'utf8');
    const parsed = dotenv.parse(raw);

    if (!parsed['DATABASE_URL']) {
      logger.warn(
        '⚠️  DATABASE_URL is missing in pulled env file. Check Vercel → Preview vars.',
      );
    }

    await run(cmd[0], cmd.slice(1), { env: { ...process.env, ...parsed } });
  } finally {
    await cleanup();
  }
};

main().catch((e: unknown) => {
  logger.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
