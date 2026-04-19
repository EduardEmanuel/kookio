import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

const recipecollectionentryscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () =>
              RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(
        () => RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema,
      )
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () =>
              RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    collectionId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    addedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
  })
  .strict();
export const RecipeCollectionEntryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryScalarWhereWithAggregatesInput> =
  recipecollectionentryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RecipeCollectionEntryScalarWhereWithAggregatesInput>;
export const RecipeCollectionEntryScalarWhereWithAggregatesInputObjectZodSchema =
  recipecollectionentryscalarwherewithaggregatesinputSchema;
