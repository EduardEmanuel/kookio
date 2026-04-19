import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserProfileCountOrderByAggregateInputObjectSchema as UserProfileCountOrderByAggregateInputObjectSchema } from './UserProfileCountOrderByAggregateInput.schema';
import { UserProfileAvgOrderByAggregateInputObjectSchema as UserProfileAvgOrderByAggregateInputObjectSchema } from './UserProfileAvgOrderByAggregateInput.schema';
import { UserProfileMaxOrderByAggregateInputObjectSchema as UserProfileMaxOrderByAggregateInputObjectSchema } from './UserProfileMaxOrderByAggregateInput.schema';
import { UserProfileMinOrderByAggregateInputObjectSchema as UserProfileMinOrderByAggregateInputObjectSchema } from './UserProfileMinOrderByAggregateInput.schema';
import { UserProfileSumOrderByAggregateInputObjectSchema as UserProfileSumOrderByAggregateInputObjectSchema } from './UserProfileSumOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      userId: SortOrderSchema.optional(),
      adultsCount: SortOrderSchema.optional(),
      childrenCount: SortOrderSchema.optional(),
      onboardingDone: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      _count: z
        .lazy(() => UserProfileCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => UserProfileAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => UserProfileMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => UserProfileMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => UserProfileSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserProfileOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserProfileOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserProfileOrderByWithAggregationInput>;
export const UserProfileOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
