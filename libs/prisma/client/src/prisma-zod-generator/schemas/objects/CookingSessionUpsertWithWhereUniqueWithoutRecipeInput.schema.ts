import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionUpdateWithoutRecipeInputObjectSchema as CookingSessionUpdateWithoutRecipeInputObjectSchema } from './CookingSessionUpdateWithoutRecipeInput.schema';
import { CookingSessionUncheckedUpdateWithoutRecipeInputObjectSchema as CookingSessionUncheckedUpdateWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedUpdateWithoutRecipeInput.schema';
import { CookingSessionCreateWithoutRecipeInputObjectSchema as CookingSessionCreateWithoutRecipeInputObjectSchema } from './CookingSessionCreateWithoutRecipeInput.schema';
import { CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema as CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CookingSessionUpdateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => CookingSessionUncheckedUpdateWithoutRecipeInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => CookingSessionCreateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const CookingSessionUpsertWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionUpsertWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpsertWithWhereUniqueWithoutRecipeInput>;
export const CookingSessionUpsertWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
