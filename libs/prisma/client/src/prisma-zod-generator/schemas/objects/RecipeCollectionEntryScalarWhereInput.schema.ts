import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

const recipecollectionentryscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionEntryScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    collectionId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    addedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();
export const RecipeCollectionEntryScalarWhereInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryScalarWhereInput> =
  recipecollectionentryscalarwhereinputSchema as unknown as z.ZodType<Prisma.RecipeCollectionEntryScalarWhereInput>;
export const RecipeCollectionEntryScalarWhereInputObjectZodSchema =
  recipecollectionentryscalarwhereinputSchema;
