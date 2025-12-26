import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

import { logger } from '@kookio/logger';

const TMP_DIR = path.resolve(process.cwd(), 'tmp');
const ENV_FILE = path.join(TMP_DIR, 'kookio.env');

function parseArgs(argv) {
  const out = {
    vercelEnv: 'development', // default
    team: undefined,
    token: undefined,
    yes: true,
    cmd: [],
  };

  const pass = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];

    // separator: everything after is the command to run
    if (a === '--') {
      out.cmd = argv.slice(i + 1);
      break;
    }

    if (a.startsWith('--env=')) out.vercelEnv = a.split('=')[1];
    else if (a === '--env') out.vercelEnv = argv[++i];
    else if (a.startsWith('--team=')) out.team = a.split('=')[1];
    else if (a === '--team') out.team = argv[++i];
    else if (a.startsWith('--token=')) out.token = a.split('=')[1];
    else if (a === '--token') out.token = argv[++i];
    else if (a === '--no-yes') out.yes = false;
    else pass.push(a);
  }

  // Support passing NX command without explicit `--` (optional).
  // If user forgot `--`, we treat remaining args as command when no known flags left.
  if (out.cmd.length === 0 && pass.length) out.cmd = pass;

  return out;
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

async function main() {
  const { vercelEnv, team, token, yes, cmd } = parseArgs(process.argv.slice(2));

  if (!cmd.length) {
    console.error(
      [
        'Usage:',
        '  node tools/scripts/with-vercel-env.mjs --env=preview -- <command...>',
        'Examples:',
        '  npm run with:env -- --env=development -- nx serve web',
        '  npm run with:env -- --env=preview -- nx e2e web-e2e',
        '  npm run with:env -- --env=production -- nx migrate-deploy prisma-client',
      ].join('\n'),
    );
    process.exit(1);
  }

  await mkdir(TMP_DIR, { recursive: true });

  // Ensure we always clean up, even on SIGINT/SIGTERM
  const cleanup = async () => {
    try {
      await rm(ENV_FILE, { force: true });
    } catch (error) {
      logger.error(error, '❌ Failed to cleanup env file:');
    }
  };
  const onSignal = async () => {
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

    // Use dotenv CLI: `dotenv -e <file> -- <cmd...>`
    await run('dotenv', ['-e', ENV_FILE, '--', ...cmd]);
  } finally {
    await cleanup();
  }
}

main().catch((e) => {
  console.error(e?.message ?? e);
  process.exit(1);
});
