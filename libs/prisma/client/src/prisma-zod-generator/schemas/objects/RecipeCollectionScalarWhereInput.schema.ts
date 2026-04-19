import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

const recipecollectionscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RecipeCollectionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema),
        z.lazy(() => RecipeCollectionScalarWhereInputObjectSchema).array(),
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
  })
  .strict();
export const RecipeCollectionScalarWhereInputObjectSchema: z.ZodType<Prisma.RecipeCollectionScalarWhereInput> =
  recipecollectionscalarwhereinputSchema as unknown as z.ZodType<Prisma.RecipeCollectionScalarWhereInput>;
export const RecipeCollectionScalarWhereInputObjectZodSchema =
  recipecollectionscalarwhereinputSchema;
