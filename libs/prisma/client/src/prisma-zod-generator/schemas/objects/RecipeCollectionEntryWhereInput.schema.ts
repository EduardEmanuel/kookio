import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RecipeCollectionScalarRelationFilterObjectSchema as RecipeCollectionScalarRelationFilterObjectSchema } from './RecipeCollectionScalarRelationFilter.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './RecipeCollectionWhereInput.schema';
import { RecipeScalarRelationFilterObjectSchema as RecipeScalarRelationFilterObjectSchema } from './RecipeScalarRelationFilter.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const recipecollectionentrywhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeCollectionEntryWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionEntryWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeCollectionEntryWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeCollectionEntryWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionEntryWhereInputObjectSchema).array(),
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
    collection: z
      .union([
        z.lazy(() => RecipeCollectionScalarRelationFilterObjectSchema),
        z.lazy(() => RecipeCollectionWhereInputObjectSchema),
      ])
      .optional(),
    recipe: z
      .union([
        z.lazy(() => RecipeScalarRelationFilterObjectSchema),
        z.lazy(() => RecipeWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();
export const RecipeCollectionEntryWhereInputObjectSchema: z.ZodType<Prisma.RecipeCollectionEntryWhereInput> =
  recipecollectionentrywhereinputSchema as unknown as z.ZodType<Prisma.RecipeCollectionEntryWhereInput>;
export const RecipeCollectionEntryWhereInputObjectZodSchema =
  recipecollectionentrywhereinputSchema;
