import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      label: SortOrderSchema.optional(),
      emoji: SortOrderSchema.optional(),
      description: SortOrderSchema.optional(),
    })
    .strict();
export const DietaryRestrictionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionMinOrderByAggregateInput>;
export const DietaryRestrictionMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
