import { IngredientDeleteOneSchema, IngredientFindUniqueResultSchema, IngredientFindUniqueSchema, IngredientResultSchema, IngredientUpdateOneSchema, PrismaClient } from '../../../index';
import { IngredientCreateInputObjectSchema } from '../../../generated/zod/schemas'
import { z } from 'zod';

// TO DO: implement for later when clear design is made for both UI and relationships
// const DEFAULT_PAGE_SIZE = 20;

/**
 * Conservative retry for CockroachDB SERIALIZABLE conflicts.
 * - Prisma may surface 40001 as a message
 * - Known codes we watch for: P2034 (tx already closed) / P2036 (tx retries)
 * Adjust if you see different patterns in logs.
 */
function isRetryableTxError(e: unknown) {
  const err = e as any;
  const code = err?.code as string | undefined;
  const msg: string = (err?.message ?? '').toString();
  return code === 'P2034' || code === 'P2036' || msg.includes('40001') || msg.includes('restart transaction');
}

async function withTxRetry<T>(
  prisma: PrismaClient,
  fn: (tx: PrismaClient) => Promise<T>,
  retries = 3
): Promise<T> {
  let last: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await prisma.$transaction(async (tx) => fn(tx));
    } catch (e) {
      last = e;
      if (!isRetryableTxError(e) || i === retries) throw e;
      await new Promise((r) => setTimeout(r, 50 * (i + 1)));
    }
  }
  throw last;
}

export type CreateIngredientDTO = z.output<typeof IngredientCreateInputObjectSchema>;
export type IngredientDTO = z.output<typeof IngredientResultSchema>;
export const IdObjectSchema = z.object({ id: z.string().uuid() });
export type IdDTO = z.output<typeof IdObjectSchema>;
export type FindUniqueIngredientDTO = z.output<typeof IngredientFindUniqueSchema>;
export type FindUniqueIngredientResultDTO = z.output<typeof IngredientFindUniqueResultSchema>;
export type UpdateOneIngredientDTO = z.output<typeof IngredientUpdateOneSchema>;
export type DeleteOneIngredientDTO = z.output<typeof IngredientDeleteOneSchema>;

export interface IngredientRepository {
  create(data: CreateIngredientDTO): Promise<IngredientDTO>;

  delete(clause: DeleteOneIngredientDTO): Promise<IngredientDTO>;

  findUnique(clause: FindUniqueIngredientDTO): Promise<FindUniqueIngredientResultDTO>;

  list(): Promise<Array<IngredientDTO>>;

  update(clause: UpdateOneIngredientDTO): Promise<IngredientDTO>;

// TO DO: implement for later when clear design is made for both UI and relationships
//   listByUser(
//     userId: string,
//     opts?: { q?: string; limit?: number; cursor?: string }
//   ): Promise<{ items: Array<any>; nextCursor?: string }>;
//   TO DO: implement for later when clear design is made for both UI and relationships
//   upsertByUserAndName(input: {
//     userId: string;
//     name: string;
//     quantity: number;
//     unit: string;
//     optional?: boolean;
//   }): Promise<{ id: string }>;
}

export class PrismaIngredientRepository implements IngredientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateIngredientDTO) {
    return this.prisma.ingredient.create({ data });
  }

  async delete(clause: DeleteOneIngredientDTO) {
    return this.prisma.ingredient.delete(clause);
  }

  async findUnique(clause: FindUniqueIngredientDTO) {
    return this.prisma.ingredient.findUnique(clause);
  }

  async list() {
    return this.prisma.ingredient.findMany();
  }

  async update(clause: UpdateOneIngredientDTO) {
    return this.prisma.ingredient.update(clause);
  }

// TO DO: implement for later when clear design is made for both UI and relationships
//   async listByUser(userId: string, opts?: { q?: string; limit?: number; cursor?: string }) {
//     const take = Math.min(opts?.limit ?? DEFAULT_PAGE_SIZE, 100);
//     const where: Prisma.ingredientWhereInput = {
//       userId,
//       ...(opts?.q ? { name: { contains: opts.q, mode: 'insensitive' } } : {}),
//     };
//     const items = await this.prisma.ingredient.findMany({
//       where,
//       take,
//       skip: opts?.cursor ? 1 : 0,
//       cursor: opts?.cursor ? { id: opts.cursor } : undefined,
//       orderBy: { createdAt: 'desc' },
//     });
//     const nextCursor = items.length === take ? items[items.length - 1].id : undefined;
//     return { items, nextCursor };
//   }
// TO DO: implement for later when clear design is made for both UI and relationships
//   async upsertByUserAndName(input: {
//     userId: string;
//     name: string;
//     quantity: number;
//     unit: string;
//     optional?: boolean;
//   }) {
//     // relies on @@unique([userId, name]) in schema
//     const key = { userId_name: { userId: input.userId, name: input.name.trim() } };
//     const rec = await withTxRetry(this.prisma, (tx) =>
//       tx.ingredient.upsert({
//         where: key,
//         create: { ...input, name: input.name.trim(), optional: !!input.optional },
//         update: { quantity: input.quantity, unit: input.unit, optional: !!input.optional },
//       })
//     );
//     return { id: rec.id };
//   }
}