import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UtensilCountOrderByAggregateInputObjectSchema as UtensilCountOrderByAggregateInputObjectSchema } from './UtensilCountOrderByAggregateInput.schema';
import { UtensilMaxOrderByAggregateInputObjectSchema as UtensilMaxOrderByAggregateInputObjectSchema } from './UtensilMaxOrderByAggregateInput.schema';
import { UtensilMinOrderByAggregateInputObjectSchema as UtensilMinOrderByAggregateInputObjectSchema } from './UtensilMinOrderByAggregateInput.schema';

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      slug: SortOrderSchema.optional(),
      name: SortOrderSchema.optional(),
      emoji: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      category: z
        .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
        .optional(),
      _count: z
        .lazy(() => UtensilCountOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => UtensilMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => UtensilMinOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict();
export const UtensilOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UtensilOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilOrderByWithAggregationInput>;
export const UtensilOrderByWithAggregationInputObjectZodSchema = makeSchema();
