import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserUtensilCountOrderByAggregateInputObjectSchema as UserUtensilCountOrderByAggregateInputObjectSchema } from './UserUtensilCountOrderByAggregateInput.schema';
import { UserUtensilMaxOrderByAggregateInputObjectSchema as UserUtensilMaxOrderByAggregateInputObjectSchema } from './UserUtensilMaxOrderByAggregateInput.schema';
import { UserUtensilMinOrderByAggregateInputObjectSchema as UserUtensilMinOrderByAggregateInputObjectSchema } from './UserUtensilMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      userId: SortOrderSchema.optional(),
      utensilId: SortOrderSchema.optional(),
      _count: z
        .lazy(() => UserUtensilCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => UserUtensilMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => UserUtensilMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UserUtensilOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserUtensilOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilOrderByWithAggregationInput>;
export const UserUtensilOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
