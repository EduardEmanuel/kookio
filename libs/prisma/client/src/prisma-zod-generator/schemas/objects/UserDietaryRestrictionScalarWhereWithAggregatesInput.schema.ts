import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';

const userdietaryrestrictionscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () =>
            UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () =>
              UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(
        () => UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
      )
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () =>
            UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () =>
              UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    dietaryRestrictionId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();
export const UserDietaryRestrictionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserDietaryRestrictionScalarWhereWithAggregatesInput> =
  userdietaryrestrictionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserDietaryRestrictionScalarWhereWithAggregatesInput>;
export const UserDietaryRestrictionScalarWhereWithAggregatesInputObjectZodSchema =
  userdietaryrestrictionscalarwherewithaggregatesinputSchema;
