import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionUpdateWithoutRecipeInputObjectSchema as CookingSessionUpdateWithoutRecipeInputObjectSchema } from './CookingSessionUpdateWithoutRecipeInput.schema';
import { CookingSessionUncheckedUpdateWithoutRecipeInputObjectSchema as CookingSessionUncheckedUpdateWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedUpdateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CookingSessionUpdateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => CookingSessionUncheckedUpdateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const CookingSessionUpdateWithWhereUniqueWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionUpdateWithWhereUniqueWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpdateWithWhereUniqueWithoutRecipeInput>;
export const CookingSessionUpdateWithWhereUniqueWithoutRecipeInputObjectZodSchema =
  makeSchema();
