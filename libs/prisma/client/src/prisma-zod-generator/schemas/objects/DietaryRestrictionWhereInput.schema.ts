import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserDietaryRestrictionListRelationFilterObjectSchema as UserDietaryRestrictionListRelationFilterObjectSchema } from './UserDietaryRestrictionListRelationFilter.schema';

const dietaryrestrictionwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => DietaryRestrictionWhereInputObjectSchema),
        z.lazy(() => DietaryRestrictionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DietaryRestrictionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DietaryRestrictionWhereInputObjectSchema),
        z.lazy(() => DietaryRestrictionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    slug: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    label: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    emoji: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    users: z
      .lazy(() => UserDietaryRestrictionListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();
export const DietaryRestrictionWhereInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionWhereInput> =
  dietaryrestrictionwhereinputSchema as unknown as z.ZodType<Prisma.DietaryRestrictionWhereInput>;
export const DietaryRestrictionWhereInputObjectZodSchema =
  dietaryrestrictionwhereinputSchema;
