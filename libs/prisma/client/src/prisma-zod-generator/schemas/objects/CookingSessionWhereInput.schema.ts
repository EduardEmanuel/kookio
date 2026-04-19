import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { RecipeScalarRelationFilterObjectSchema as RecipeScalarRelationFilterObjectSchema } from './RecipeScalarRelationFilter.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const cookingsessionwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => CookingSessionWhereInputObjectSchema),
        z.lazy(() => CookingSessionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CookingSessionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CookingSessionWhereInputObjectSchema),
        z.lazy(() => CookingSessionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    recipeId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    servings: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    completedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema),
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
export const CookingSessionWhereInputObjectSchema: z.ZodType<Prisma.CookingSessionWhereInput> =
  cookingsessionwhereinputSchema as unknown as z.ZodType<Prisma.CookingSessionWhereInput>;
export const CookingSessionWhereInputObjectZodSchema =
  cookingsessionwhereinputSchema;
