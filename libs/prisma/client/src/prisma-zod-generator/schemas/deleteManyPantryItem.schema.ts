import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PantryItemWhereInputObjectSchema as PantryItemWhereInputObjectSchema } from './objects/PantryItemWhereInput.schema';

export const PantryItemDeleteManySchema: z.ZodType<Prisma.PantryItemDeleteManyArgs> =
  z
    .object({ where: PantryItemWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.PantryItemDeleteManyArgs>;

export const PantryItemDeleteManyZodSchema = z
  .object({ where: PantryItemWhereInputObjectSchema.optional() })
  .strict();
