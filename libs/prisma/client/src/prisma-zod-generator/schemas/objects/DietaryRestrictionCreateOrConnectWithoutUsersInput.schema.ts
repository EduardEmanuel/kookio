import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './DietaryRestrictionWhereUniqueInput.schema';
import { DietaryRestrictionCreateWithoutUsersInputObjectSchema as DietaryRestrictionCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedCreateWithoutUsersInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => DietaryRestrictionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DietaryRestrictionCreateWithoutUsersInputObjectSchema),
        z.lazy(
          () => DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const DietaryRestrictionCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionCreateOrConnectWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionCreateOrConnectWithoutUsersInput>;
export const DietaryRestrictionCreateOrConnectWithoutUsersInputObjectZodSchema =
  makeSchema();
