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
export const UserDietaryRestrictionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionMaxOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionMaxOrderByAggregateInput>;
export const UserDietaryRestrictionMaxOrderByAggregateInputObjectZodSchema =
  makeSchema();
