import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

const mealareascalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => MealAreaScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => MealAreaScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MealAreaScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MealAreaScalarWhereWithAggregatesInputObjectSchema),
        z
          .lazy(() => MealAreaScalarWhereWithAggregatesInputObjectSchema)
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    flag: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
  })
  .strict();
export const MealAreaScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MealAreaScalarWhereWithAggregatesInput> =
  mealareascalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MealAreaScalarWhereWithAggregatesInput>;
export const MealAreaScalarWhereWithAggregatesInputObjectZodSchema =
  mealareascalarwherewithaggregatesinputSchema;
