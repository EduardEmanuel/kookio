import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { RecipeCollectionEntryListRelationFilterObjectSchema as RecipeCollectionEntryListRelationFilterObjectSchema } from './RecipeCollectionEntryListRelationFilter.schema';

const recipecollectionwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeCollectionWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeCollectionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeCollectionWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    emoji: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
      ])
      .optional(),
    recipes: z
      .lazy(() => RecipeCollectionEntryListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();
export const RecipeCollectionWhereInputObjectSchema: z.ZodType<Prisma.RecipeCollectionWhereInput> =
  recipecollectionwhereinputSchema as unknown as z.ZodType<Prisma.RecipeCollectionWhereInput>;
export const RecipeCollectionWhereInputObjectZodSchema =
  recipecollectionwhereinputSchema;
