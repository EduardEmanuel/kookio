import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserDietaryRestrictionListRelationFilterObjectSchema as UserDietaryRestrictionListRelationFilterObjectSchema } from './UserDietaryRestrictionListRelationFilter.schema';
import { UserUtensilListRelationFilterObjectSchema as UserUtensilListRelationFilterObjectSchema } from './UserUtensilListRelationFilter.schema';

const userprofilewhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserProfileWhereInputObjectSchema),
        z.lazy(() => UserProfileWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserProfileWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserProfileWhereInputObjectSchema),
        z.lazy(() => UserProfileWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    adultsCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    childrenCount: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    onboardingDone: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
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
    dietaryRestrictions: z
      .lazy(() => UserDietaryRestrictionListRelationFilterObjectSchema)
      .optional(),
    utensils: z
      .lazy(() => UserUtensilListRelationFilterObjectSchema)
      .optional(),
  })
  .strict();
export const UserProfileWhereInputObjectSchema: z.ZodType<Prisma.UserProfileWhereInput> =
  userprofilewhereinputSchema as unknown as z.ZodType<Prisma.UserProfileWhereInput>;
export const UserProfileWhereInputObjectZodSchema = userprofilewhereinputSchema;
