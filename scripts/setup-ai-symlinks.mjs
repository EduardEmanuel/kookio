import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { logger } from './utils.mjs';

const root = process.cwd();
const aiDir = path.join(root, '.ai');
const source = path.join('.ai', 'guidelines.md');
const isWindows = process.platform === 'win32';

const GITIGNORE_MARKER_START =
  '# BEGIN: AI Setup (auto-generated — do not edit manually)';
const GITIGNORE_MARKER_END = '# END: AI Setup';
const GENERATED_HEADER =
  '<!-- AUTO-GENERATED — do not edit directly -->\n<!-- Edit source files in .ai/ and run: npm run setup:ai -->\n';

const HELP = `
Usage: node scripts/setup-ai-symlinks.mjs --targets=<a,b,...>

Builds .ai/guidelines.md from numbered source files (.ai/01_*.md, .ai/02_*.md, ...)
then propagates it to all AI tool config files.
On Unix/macOS, creates relative symlinks. On Windows, copies the file.
Existing files are always overwritten.
Also updates .gitignore to exclude all target files.

Options:
  --targets=<a,b,...>  Comma-separated list of target paths (required)
  --help               Show this help message

Examples:
  node scripts/setup-ai-symlinks.mjs --targets=AGENTS.md,CLAUDE.md,GEMINI.md,.github/copilot-instructions.md
`;

if (process.argv.includes('--help')) {
  logger.info(HELP);
  process.exit(0);
}

const targetsArg = process.argv.find((a) => a.startsWith('--targets='));
if (!targetsArg) {
  logger.error('Error: --targets is required.\n' + HELP);
  process.exit(1);
}

const targets = targetsArg
  .slice('--targets='.length)
  .split(',')
  .filter(Boolean);

// --- Phase 1: Build guidelines.md from numbered source files ---
logger.info('📝 Building guidelines.md...\n');

const sourceFiles = readdirSync(aiDir)
  .filter((f) => /^\d+_.*\.md$/.test(f))
  .sort()
  .map((f) => path.join(aiDir, f));

if (sourceFiles.length === 0) {
  logger.error(
    'Error: No numbered source files found in .ai/ (expected format: 01_name.md)',
  );
  process.exit(1);
}

const sections = sourceFiles.map((filePath) => {
  const relativeName = path.relative(aiDir, filePath);
  const content = readFileSync(filePath, 'utf8').trimEnd();
  return `<!-- source: ${relativeName} -->\n\n${content}`;
});

const assembled = GENERATED_HEADER + '\n' + sections.join('\n\n---\n\n') + '\n';
writeFileSync(source, assembled, 'utf8');
logger.info(`✅ Assembled: ${sourceFiles.length} file(s) → guidelines.md\n`);

// --- Phase 2: Symlinks / Copies ---
logger.info('🔗 Setting up symlinks...\n');

mkdirSync(path.join(root, '.github'), { recursive: true });

for (const target of targets) {
  const targetPath = path.join(root, target);

  if (existsSync(targetPath)) {
    rmSync(targetPath);
  }

  if (isWindows) {
    copyFileSync(path.join(root, source), targetPath);
    logger.info(`📋 Copied:   ${target}`);
  } else {
    const depth = target.split(path.sep).length - 1;
    const relative = path.join('../'.repeat(depth), source);
    symlinkSync(relative, targetPath);
    logger.info(`🔗 Linked:   ${target} → ${relative}`);
  }
}

// --- Phase 3: .gitignore ---
const gitignorePath = path.join(root, '.gitignore');
const original = existsSync(gitignorePath)
  ? readFileSync(gitignorePath, 'utf8')
  : '';

const block = [
  GITIGNORE_MARKER_START,
  '.ai/guidelines.md',
  ...targets,
  GITIGNORE_MARKER_END,
].join('\n');

const startIdx = original.indexOf(GITIGNORE_MARKER_START);
const endIdx = original.indexOf(GITIGNORE_MARKER_END);

let updated;
if (startIdx !== -1 && endIdx !== -1) {
  updated =
    original.slice(0, startIdx) +
    block +
    original.slice(endIdx + GITIGNORE_MARKER_END.length);
} else {
  updated = original.trimEnd() + '\n\n' + block + '\n';
}

writeFileSync(gitignorePath, updated, 'utf8');
logger.info('📝 Updated:  .gitignore');

logger.info('\n✅ AI guidelines setup complete.');
