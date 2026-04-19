import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';

const makeSchema = () =>
  z
    .object({
      userId: SortOrderSchema.optional(),
      dietaryRestrictionId: SortOrderSchema.optional(),
    })
    .strict();
export const UserDietaryRestrictionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionMinOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionMinOrderByAggregateInput>;
export const UserDietaryRestrictionMinOrderByAggregateInputObjectZodSchema =
  makeSchema();
