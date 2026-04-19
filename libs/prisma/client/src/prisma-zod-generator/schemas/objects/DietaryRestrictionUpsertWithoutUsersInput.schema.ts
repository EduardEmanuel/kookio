import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionUpdateWithoutUsersInputObjectSchema as DietaryRestrictionUpdateWithoutUsersInputObjectSchema } from './DietaryRestrictionUpdateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedUpdateWithoutUsersInput.schema';
import { DietaryRestrictionCreateWithoutUsersInputObjectSchema as DietaryRestrictionCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedCreateWithoutUsersInput.schema';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './DietaryRestrictionWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => DietaryRestrictionUpdateWithoutUsersInputObjectSchema),
        z.lazy(
          () => DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => DietaryRestrictionCreateWithoutUsersInputObjectSchema),
        z.lazy(
          () => DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => DietaryRestrictionWhereInputObjectSchema).optional(),
    })
    .strict();
export const DietaryRestrictionUpsertWithoutUsersInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUpsertWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUpsertWithoutUsersInput>;
export const DietaryRestrictionUpsertWithoutUsersInputObjectZodSchema =
  makeSchema();
