import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DietaryRestrictionCountOrderByAggregateInputObjectSchema as DietaryRestrictionCountOrderByAggregateInputObjectSchema } from './DietaryRestrictionCountOrderByAggregateInput.schema';
import { DietaryRestrictionMaxOrderByAggregateInputObjectSchema as DietaryRestrictionMaxOrderByAggregateInputObjectSchema } from './DietaryRestrictionMaxOrderByAggregateInput.schema';
import { DietaryRestrictionMinOrderByAggregateInputObjectSchema as DietaryRestrictionMinOrderByAggregateInputObjectSchema } from './DietaryRestrictionMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      label: SortOrderSchema.optional(),
      emoji: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      description: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      _count: z
        .lazy(() => DietaryRestrictionCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => DietaryRestrictionMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => DietaryRestrictionMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const DietaryRestrictionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionOrderByWithAggregationInput>;
export const DietaryRestrictionOrderByWithAggregationInputObjectZodSchema =
  makeSchema();
