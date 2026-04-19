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
export const DietaryRestrictionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionCountOrderByAggregateInput>;
export const DietaryRestrictionCountOrderByAggregateInputObjectZodSchema =
  makeSchema();
