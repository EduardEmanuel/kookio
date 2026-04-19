import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      externalId: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      flag: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
    })
    .strict();
export const MealAreaCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MealAreaCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCountOrderByAggregateInput>;
export const MealAreaCountOrderByAggregateInputObjectZodSchema = makeSchema();
