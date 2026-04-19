import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserDietaryRestrictionCountOrderByAggregateInputObjectSchema as UserDietaryRestrictionCountOrderByAggregateInputObjectSchema } from './UserDietaryRestrictionCountOrderByAggregateInput.schema';
import { UserDietaryRestrictionMaxOrderByAggregateInputObjectSchema as UserDietaryRestrictionMaxOrderByAggregateInputObjectSchema } from './UserDietaryRestrictionMaxOrderByAggregateInput.schema';
import { UserDietaryRestrictionMinOrderByAggregateInputObjectSchema as UserDietaryRestrictionMinOrderByAggregateInputObjectSchema } from './UserDietaryRestrictionMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      userId: SortOrderSchema.optional(),
      dietaryRestrictionId: SortOrderSchema.optional(),
      _count: z
        .lazy(
          () => UserDietaryRestrictionCountOrderByAggregateInputObjectSchema,
        )
        .optional(),
      _max: z
        .lazy(() => UserDietaryRestrictionMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => UserDietaryRestrictionMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserDietaryRestrictionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserDietaryRestrictionOrderByWithAggregationInput>;
export const UserDietaryRestrictionOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
