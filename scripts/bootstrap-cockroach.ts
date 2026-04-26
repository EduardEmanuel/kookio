#!/usr/bin/env tsx

import { spawn } from 'node:child_process';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

interface Config {
  host: string;
  user: string;
  insecure: boolean;
  certsDir: string;
  url: string;
  dbPrefix: string;
  tiers: string[];
  databasesOverride: string;
  appUser: string;
  migrateUser: string;
  appPassword: string;
  migratePassword: string;
  skipRoles: boolean;
  skipDrop: boolean;
  dryRun: boolean;
  confirm: boolean;
}

const SCRIPT_NAME = basename(fileURLToPath(import.meta.url));

const defaults: Config = {
  host: 'localhost:26257',
  user: 'root',
  insecure: false,
  certsDir: '',
  url: process.env['DATABASE_URL'] ?? '',
  dbPrefix: 'kookio',
  tiers: ['dev', 'test', 'prod'],
  databasesOverride: '',
  appUser: process.env['DB_USER_KOOKIO_APP'] ?? 'kookio_app',
  migrateUser: process.env['DB_USER_KOOKIO_MIGRATE'] ?? 'kookio_migrate',
  appPassword: process.env['DB_USER_KOOKIO_APP_PASSWORD'] ?? '',
  migratePassword: process.env['DB_USER_KOOKIO_MIGRATE_PASSWORD'] ?? '',
  skipRoles: false,
  skipDrop: false,
  dryRun: false,
  confirm: true,
};

const isTTY = output.isTTY;
const color = {
  red: isTTY ? '\x1b[0;31m' : '',
  green: isTTY ? '\x1b[0;32m' : '',
  yellow: isTTY ? '\x1b[1;33m' : '',
  blue: isTTY ? '\x1b[0;34m' : '',
  bold: isTTY ? '\x1b[1m' : '',
  reset: isTTY ? '\x1b[0m' : '',
};

const log = {
  info: (msg: string) =>
    console.log(`${color.blue}[INFO]${color.reset}  ${msg}`),
  ok: (msg: string) =>
    console.log(`${color.green}[OK]${color.reset}    ${msg}`),
  warn: (msg: string) =>
    console.error(`${color.yellow}[WARN]${color.reset}  ${msg}`),
  error: (msg: string) =>
    console.error(`${color.red}[ERROR]${color.reset} ${msg}`),
};

const showHelp = (): void => {
  const b = color.bold;
  const r = color.reset;
  console.log(`${b}${SCRIPT_NAME}${r} - Bootstrap CockroachDB databases and roles

${b}DESCRIPTION${r}
  Creates application databases (default: kookio_dev, kookio_test, kookio_prod),
  the runtime role (kookio_app) and the migration role (kookio_migrate),
  applies the required privileges and optionally drops the default databases
  (defaultdb, postgres).

${b}USAGE${r}
  tsx ${SCRIPT_NAME} [OPTIONS]

${b}CONNECTION OPTIONS${r}
  -h, --host HOST:PORT        CockroachDB host and port (default: ${defaults.host})
  -u, --user USER             Admin user for the connection (default: ${defaults.user})
  -i, --insecure              Insecure connection (no TLS) - local dev only
  -c, --certs-dir DIR         Directory containing TLS certificates (secure mode)
      --url URL               Full connection string (overrides host/user/certs)
                              e.g. "postgresql://root@host:26257/defaultdb?sslmode=verify-full"

${b}DATABASE NAMING OPTIONS${r}
      --db-prefix PREFIX      Prefix for database names (default: ${defaults.dbPrefix})
                              Databases become: <prefix>_<tier> (e.g. myapp_dev)
      --tiers LIST            Comma-separated list of tiers to create
                              (default: dev,test,prod)
                              e.g. --tiers dev,staging,prod
      --databases LIST        Comma-separated list of EXPLICIT database names.
                              Overrides --db-prefix and --tiers entirely.
                              e.g. --databases myapp,analytics,reporting

${b}ROLE OPTIONS${r}
      --app-user NAME         Runtime role name (default: ${defaults.appUser})
      --migrate-user NAME     Migration role name (default: ${defaults.migrateUser})
      --app-password PASS     Password for the runtime role
      --migrate-password PASS Password for the migration role
                              (Passwords are optional in --insecure mode.)
      --skip-roles            Do not create roles (assume they already exist)

${b}GENERAL OPTIONS${r}
      --skip-drop             Do not drop defaultdb and postgres
      --dry-run               Print the generated SQL without executing it
  -y, --yes                   Do not ask for confirmation before executing
      --help                  Show this help message and exit

${b}EXAMPLES${r}
  ${b}# Local insecure dev, default names (kookio_dev/test/prod):${r}
  tsx ${SCRIPT_NAME} --insecure --host localhost:26257

  ${b}# Custom prefix and tiers:${r}
  tsx ${SCRIPT_NAME} --insecure --db-prefix myapp --tiers dev,staging,prod

  ${b}# Fully explicit database names:${r}
  tsx ${SCRIPT_NAME} --insecure --databases analytics,reporting,billing

  ${b}# With explicit passwords:${r}
  tsx ${SCRIPT_NAME} --insecure \\
      --app-password 'appSecret123' \\
      --migrate-password 'migSecret456'

  ${b}# Secure cluster using certificates:${r}
  tsx ${SCRIPT_NAME} --host prod.db:26257 --certs-dir ~/cockroach-certs \\
      --app-password "$APP_PASS" --migrate-password "$MIG_PASS"

  ${b}# CockroachDB Cloud using a connection URL:${r}
  tsx ${SCRIPT_NAME} --url "postgresql://root@cluster.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full" \\
      --app-password "$APP_PASS" --migrate-password "$MIG_PASS"

  ${b}# Preview the SQL that would run (no changes made):${r}
  tsx ${SCRIPT_NAME} --insecure --dry-run

  ${b}# Unattended run (CI):${r}
  tsx ${SCRIPT_NAME} --insecure --yes \\
      --app-password "$APP_PASS" --migrate-password "$MIG_PASS"

${b}NOTES${r}
  - Requires the 'cockroach' CLI to be on PATH.
  - Passwords may also be provided via environment variables:
      KOOKIO_APP_PASSWORD, KOOKIO_MIGRATE_PASSWORD
  - For production use --certs-dir or --url with TLS; never use --insecure.
  - --databases takes priority over --db-prefix / --tiers when both are given.
`);
};

const parseArgs = (argv: string[]): Config => {
  const cfg: Config = { ...defaults };
  const args = argv.slice(2);

  const needsValue = (flag: string, i: number): string => {
    if (i + 1 >= args.length) {
      log.error(`Option ${flag} requires a value.`);
      process.exit(1);
    }
    return args[i + 1];
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '-h':
      case '--host':
        cfg.host = needsValue(arg, i);
        i++;
        break;
      case '-u':
      case '--user':
        cfg.user = needsValue(arg, i);
        i++;
        break;
      case '-i':
      case '--insecure':
        cfg.insecure = true;
        break;
      case '-c':
      case '--certs-dir':
        cfg.certsDir = needsValue(arg, i);
        i++;
        break;
      case '--url':
        cfg.url = needsValue(arg, i);
        i++;
        break;
      case '--db-prefix':
        cfg.dbPrefix = needsValue(arg, i);
        i++;
        break;
      case '--tiers':
        cfg.tiers = needsValue(arg, i)
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        i++;
        break;
      case '--databases':
        cfg.databasesOverride = needsValue(arg, i);
        i++;
        break;
      case '--app-user':
        cfg.appUser = needsValue(arg, i);
        i++;
        break;
      case '--migrate-user':
        cfg.migrateUser = needsValue(arg, i);
        i++;
        break;
      case '--app-password':
        cfg.appPassword = needsValue(arg, i);
        i++;
        break;
      case '--migrate-password':
        cfg.migratePassword = needsValue(arg, i);
        i++;
        break;
      case '--skip-roles':
        cfg.skipRoles = true;
        break;
      case '--skip-drop':
        cfg.skipDrop = true;
        break;
      case '--dry-run':
        cfg.dryRun = true;
        break;
      case '-y':
      case '--yes':
        cfg.confirm = false;
        break;
      case '--help':
        showHelp();
        process.exit(0);
        break;
      default:
        log.error(`Unknown option: ${arg}`);
        console.error(`Run: tsx ${SCRIPT_NAME} --help`);
        process.exit(1);
    }
  }

  return cfg;
};

const resolveDatabases = (cfg: Config): string[] => {
  let databases: string[];

  if (cfg.databasesOverride) {
    databases = cfg.databasesOverride
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);
  } else {
    databases = cfg.tiers
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => `${cfg.dbPrefix}_${t}`);
  }

  if (databases.length === 0) {
    log.error(
      'Resolved database list is empty. Check --db-prefix / --tiers / --databases.',
    );
    process.exit(1);
  }

  const identifierRe = /^[A-Za-z_][A-Za-z0-9_]*$/;
  for (const db of databases) {
    if (!identifierRe.test(db)) {
      log.error(`Invalid database identifier: '${db}'`);
      log.error(
        'Use only letters, digits and underscores; must not start with a digit.',
      );
      process.exit(1);
    }
  }

  return databases;
};

const cockroachAvailable = (): Promise<boolean> =>
  new Promise((res) => {
    const checker = spawn('cockroach', ['version'], { stdio: 'ignore' });
    checker.on('error', () => res(false));
    checker.on('exit', (code) => res(code === 0));
  });

const validate = async (cfg: Config): Promise<void> => {
  const hasCockroach = await cockroachAvailable();
  if (!hasCockroach) {
    if (cfg.dryRun) {
      log.warn("'cockroach' CLI not found in PATH (ok for --dry-run).");
    } else {
      log.error(
        "'cockroach' CLI not found in PATH. Install CockroachDB CLI first.",
      );
      process.exit(1);
    }
  }

  if (!cfg.insecure && !cfg.certsDir && !cfg.url) {
    log.error('You must specify one of: --insecure, --certs-dir or --url');
    process.exit(1);
  }

  if (!cfg.skipRoles && !cfg.insecure) {
    if (!cfg.appPassword || !cfg.migratePassword) {
      log.error('Passwords are required in secure mode.');
      log.error(
        'Use --app-password and --migrate-password (or the environment variables).',
      );
      process.exit(1);
    }
  }
};

const buildCockroachArgs = (cfg: Config): string[] => {
  const args: string[] = ['sql'];

  if (cfg.url) {
    args.push('--url', cfg.url);
  } else if (cfg.insecure) {
    args.push('--insecure', '--host', cfg.host, '--user', cfg.user);
  } else {
    args.push(
      '--certs-dir',
      cfg.certsDir,
      '--host',
      cfg.host,
      '--user',
      cfg.user,
    );
  }

  return args;
};

const sqlEscape = (s: string): string => s.replace(/'/g, "''");

const generateRolesSql = (cfg: Config): string => {
  const appClause = cfg.appPassword
    ? `WITH LOGIN PASSWORD '${sqlEscape(cfg.appPassword)}'`
    : 'WITH LOGIN';
  const migClause = cfg.migratePassword
    ? `WITH LOGIN PASSWORD '${sqlEscape(cfg.migratePassword)}'`
    : 'WITH LOGIN';

  return `---------------------------
-- Roles
---------------------------
CREATE ROLE IF NOT EXISTS ${cfg.appUser} ${appClause};
CREATE ROLE IF NOT EXISTS ${cfg.migrateUser} ${migClause};`;
};

const generateDbBlock = (cfg: Config, db: string): string => `
---------------------------
-- ${db}
---------------------------
CREATE DATABASE IF NOT EXISTS ${db};
USE ${db};

REVOKE ALL ON DATABASE ${db} FROM public;
REVOKE ALL ON SCHEMA  public  FROM public;

-- Runtime (no DDL)
GRANT CONNECT ON DATABASE ${db}  TO ${cfg.appUser};
GRANT USAGE   ON SCHEMA  public TO ${cfg.appUser};
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO ${cfg.appUser};
GRANT USAGE, SELECT                   ON ALL SEQUENCES IN SCHEMA public TO ${cfg.appUser};

-- Migrations (full DDL)
GRANT ALL PRIVILEGES ON DATABASE ${db}  TO ${cfg.migrateUser};
GRANT ALL PRIVILEGES ON SCHEMA   public TO ${cfg.migrateUser};

-- Default privileges for future objects created by the migration role
ALTER DEFAULT PRIVILEGES FOR ROLE ${cfg.migrateUser} IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO ${cfg.appUser};
ALTER DEFAULT PRIVILEGES FOR ROLE ${cfg.migrateUser} IN SCHEMA public
  GRANT USAGE, SELECT                   ON SEQUENCES TO ${cfg.appUser};`;

const generateCleanupSql = (firstDb: string): string => `
---------------------------
-- Cleanup default databases
---------------------------
USE ${firstDb};
DROP DATABASE IF EXISTS defaultdb CASCADE;
DROP DATABASE IF EXISTS postgres CASCADE;`;

const generateFullSql = (cfg: Config, databases: string[]): string => {
  const parts: string[] = [];
  parts.push(`-- Generated by ${SCRIPT_NAME} on ${new Date().toISOString()}`);
  parts.push(`-- Target databases: ${databases.join(' ')}`);

  if (!cfg.skipRoles) {
    parts.push(generateRolesSql(cfg));
  } else {
    parts.push('\n-- Role creation skipped (--skip-roles)');
  }

  for (const db of databases) {
    parts.push(generateDbBlock(cfg, db));
  }

  if (!cfg.skipDrop) {
    parts.push(generateCleanupSql(databases[0]));
  } else {
    parts.push('\n-- defaultdb/postgres cleanup skipped (--skip-drop)');
  }

  parts.push('\n-- End of script');
  return parts.join('\n');
};

const printSummary = (cfg: Config, databases: string[]): void => {
  console.log('');
  console.log(`${color.bold}=== Configuration ===${color.reset}`);
  if (cfg.url) {
    console.log(`  URL:            ${cfg.url}`);
  } else {
    console.log(`  Host:           ${cfg.host}`);
    console.log(`  User:           ${cfg.user}`);
    console.log(
      `  Mode:           ${cfg.insecure ? 'insecure' : `secure (certs-dir: ${cfg.certsDir})`}`,
    );
  }
  console.log(`  Databases:      ${databases.join(' ')}`);
  console.log(
    `  App role:       ${cfg.appUser}${cfg.appPassword ? ' (with password)' : ' (no password)'}`,
  );
  console.log(
    `  Migrate role:   ${cfg.migrateUser}${cfg.migratePassword ? ' (with password)' : ' (no password)'}`,
  );
  console.log(`  Skip roles:     ${cfg.skipRoles}`);
  console.log(`  Skip cleanup:   ${cfg.skipDrop}`);
  console.log(`  Dry-run:        ${cfg.dryRun}`);
  console.log('');
};

const runCockroachSql = (args: string[], sql: string): Promise<number> =>
  new Promise((resolvePromise, rejectPromise) => {
    const child = spawn('cockroach', args, {
      stdio: ['pipe', 'inherit', 'inherit'],
    });

    child.on('error', rejectPromise);
    child.on('exit', (code) => resolvePromise(code ?? 1));

    child.stdin.write(sql);
    child.stdin.end();
  });

const confirmExecution = async (): Promise<boolean> => {
  const rl = createInterface({ input, output });
  try {
    const answer = await rl.question(
      'Proceed with execution on the cluster? [y/N] ',
    );
    return /^(y|yes)$/i.test(answer.trim());
  } finally {
    rl.close();
  }
};

const main = async (): Promise<void> => {
  const cfg = parseArgs(process.argv);
  const databases = resolveDatabases(cfg);
  await validate(cfg);
  printSummary(cfg, databases);

  const sql = generateFullSql(cfg, databases);

  if (cfg.dryRun) {
    log.info('Dry-run — SQL that would be executed:');
    console.log('----------------------------------------');
    console.log(sql);
    console.log('----------------------------------------');
    return;
  }

  if (cfg.confirm) {
    const proceed = await confirmExecution();
    if (!proceed) {
      log.warn('Cancelled by user.');
      return;
    }
  }

  const cockroachArgs = buildCockroachArgs(cfg);
  log.info('Executing SQL on the cluster...');

  const exitCode = await runCockroachSql(cockroachArgs, sql);
  if (exitCode === 0) {
    log.ok('Bootstrap completed successfully.');
    log.info(
      `Verify with: cockroach ${cockroachArgs.join(' ')} -e 'SHOW DATABASES;'`,
    );
  } else {
    log.error(`Execution failed (exit code ${exitCode}). See messages above.`);
    process.exit(exitCode);
  }
};

main().catch((err) => {
  log.error(
    `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
  );
  process.exit(1);
});
