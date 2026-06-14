import { GlobalPrismaClient } from './prisma-client';
import { prisma } from './prisma-client';

describe('GlobalPrismaClient', () => {
  const g = globalThis as unknown as GlobalPrismaClient;

  it('should make global prisma client', () => {
    expect(g.prisma).toEqual(prisma);
  });
});
