import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      emoji: SortOrderSchema.optional(),
      category: SortOrderSchema.optional(),
    })
    .strict();
export const UtensilCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UtensilCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilCountOrderByAggregateInput>;
export const UtensilCountOrderByAggregateInputObjectZodSchema = makeSchema();
