import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';

const dietaryrestrictionscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    slug: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    label: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    emoji: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    description: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
  })
  .strict();
export const DietaryRestrictionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionScalarWhereWithAggregatesInput> =
  dietaryrestrictionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.DietaryRestrictionScalarWhereWithAggregatesInput>;
export const DietaryRestrictionScalarWhereWithAggregatesInputObjectZodSchema =
  dietaryrestrictionscalarwherewithaggregatesinputSchema;
