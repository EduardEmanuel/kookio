import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionCreateWithoutUsersInputObjectSchema as DietaryRestrictionCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedCreateWithoutUsersInput.schema';
import { DietaryRestrictionCreateOrConnectWithoutUsersInputObjectSchema as DietaryRestrictionCreateOrConnectWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateOrConnectWithoutUsersInput.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './DietaryRestrictionWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => DietaryRestrictionCreateWithoutUsersInputObjectSchema),
          z.lazy(
            () =>
              DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => DietaryRestrictionCreateOrConnectWithoutUsersInputObjectSchema,
        )
        .optional(),
      connect: z
        .lazy(() => DietaryRestrictionWhereUniqueInputObjectSchema)
        .optional(),
    })
    .strict();
export const DietaryRestrictionCreateNestedOneWithoutUsersInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionCreateNestedOneWithoutUsersInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionCreateNestedOneWithoutUsersInput>;
export const DietaryRestrictionCreateNestedOneWithoutUsersInputObjectZodSchema =
  makeSchema();
