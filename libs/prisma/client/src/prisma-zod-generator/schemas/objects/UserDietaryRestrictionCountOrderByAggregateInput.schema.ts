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
export const UserDietaryRestrictionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionCountOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionCountOrderByAggregateInput>;
export const UserDietaryRestrictionCountOrderByAggregateInputObjectZodSchema =
  makeSchema();
