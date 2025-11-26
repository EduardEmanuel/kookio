import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const ingredientscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => IngredientScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => IngredientScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => IngredientScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => IngredientScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => IngredientScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  unit: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  optional: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const IngredientScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.IngredientScalarWhereWithAggregatesInput> = ingredientscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.IngredientScalarWhereWithAggregatesInput>;
export const IngredientScalarWhereWithAggregatesInputObjectZodSchema = ingredientscalarwherewithaggregatesinputSchema;
