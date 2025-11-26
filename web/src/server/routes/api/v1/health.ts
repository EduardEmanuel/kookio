import { defineEventHandler } from 'h3';
import { prisma }  from '@kookio/prisma-client';

export default defineEventHandler(async () => {
  let db = 'unknown';
  try {
    await prisma.$queryRawUnsafe('SELECT 1');
    db = 'ok';
  } catch {
    db = 'down';
  }

  return {
    status: 'ok',
    db,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});