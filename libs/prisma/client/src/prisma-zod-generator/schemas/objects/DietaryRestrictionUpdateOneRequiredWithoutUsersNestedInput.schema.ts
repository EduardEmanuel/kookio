import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DietaryRestrictionCreateWithoutUsersInputObjectSchema as DietaryRestrictionCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedCreateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedCreateWithoutUsersInput.schema';
import { DietaryRestrictionCreateOrConnectWithoutUsersInputObjectSchema as DietaryRestrictionCreateOrConnectWithoutUsersInputObjectSchema } from './DietaryRestrictionCreateOrConnectWithoutUsersInput.schema';
import { DietaryRestrictionUpsertWithoutUsersInputObjectSchema as DietaryRestrictionUpsertWithoutUsersInputObjectSchema } from './DietaryRestrictionUpsertWithoutUsersInput.schema';
import { DietaryRestrictionWhereUniqueInputObjectSchema as DietaryRestrictionWhereUniqueInputObjectSchema } from './DietaryRestrictionWhereUniqueInput.schema';
import { DietaryRestrictionUpdateToOneWithWhereWithoutUsersInputObjectSchema as DietaryRestrictionUpdateToOneWithWhereWithoutUsersInputObjectSchema } from './DietaryRestrictionUpdateToOneWithWhereWithoutUsersInput.schema';
import { DietaryRestrictionUpdateWithoutUsersInputObjectSchema as DietaryRestrictionUpdateWithoutUsersInputObjectSchema } from './DietaryRestrictionUpdateWithoutUsersInput.schema';
import { DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema as DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema } from './DietaryRestrictionUncheckedUpdateWithoutUsersInput.schema';

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
      upsert: z
        .lazy(() => DietaryRestrictionUpsertWithoutUsersInputObjectSchema)
        .optional(),
      connect: z
        .lazy(() => DietaryRestrictionWhereUniqueInputObjectSchema)
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              DietaryRestrictionUpdateToOneWithWhereWithoutUsersInputObjectSchema,
          ),
          z.lazy(() => DietaryRestrictionUpdateWithoutUsersInputObjectSchema),
          z.lazy(
            () =>
              DietaryRestrictionUncheckedUpdateWithoutUsersInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectSchema: z.ZodType<Prisma.DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInput>;
export const DietaryRestrictionUpdateOneRequiredWithoutUsersNestedInputObjectZodSchema =
  makeSchema();
