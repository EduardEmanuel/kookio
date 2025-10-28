import { spawn } from 'child_process';
import path from 'node:path';
import dotenvSafe from 'dotenv-safe';

const envFile = process.argv[2] || '.env.local';
const prismaCommand = process.argv[3] || 'generate';
const prismaArgs = process.argv.slice(4); // e.g. --schema=schemas/schema.prisma

// Load env vars from selected file
dotenvSafe.config({
  path: path.resolve(__dirname, `../${envFile}`),
  example: path.resolve(__dirname, `../.env.example`),
  allowEmptyValues: true,
});

// Spawn Prisma CLI with the loaded environment
const child = spawn('npx', ['prisma', prismaCommand, ...prismaArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('close', (code) => {
  process.exit(code ?? 0);
});