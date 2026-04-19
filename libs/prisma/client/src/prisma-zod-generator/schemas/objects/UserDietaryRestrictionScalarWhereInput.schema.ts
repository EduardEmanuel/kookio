import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';

const userdietaryrestrictionscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema),
        z
          .lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema)
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema),
        z
          .lazy(() => UserDietaryRestrictionScalarWhereInputObjectSchema)
          .array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    dietaryRestrictionId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();
export const UserDietaryRestrictionScalarWhereInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionScalarWhereInput> =
  userdietaryrestrictionscalarwhereinputSchema as unknown as z.ZodType<Prisma.UserDietaryRestrictionScalarWhereInput>;
export const UserDietaryRestrictionScalarWhereInputObjectZodSchema =
  userdietaryrestrictionscalarwhereinputSchema;
