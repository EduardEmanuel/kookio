import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionWhereInputObjectSchema as DietaryRestrictionWhereInputObjectSchema } from './DietaryRestrictionWhereInput.schema';
import { DietaryRestrictionUpdateWithoutUsersInputObjectSchema as DietaryRestrictionUpdateWithoutUsersInputObjectSchema } from './DietaryRestrictionUpdateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedUpdateWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => DietaryRestrictionWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => DietaryRestrictionUpdateWithoutUsersInputObjectSchema),
        z.lazy(
          () => DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const DietaryRestrictionUpdateToOneWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUpdateToOneWithWhereWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUpdateToOneWithWhereWithoutUsersInput>;
export const DietaryRestrictionUpdateToOneWithWhereWithoutUsersInputObjectZodSchema =
  makeSchema();
