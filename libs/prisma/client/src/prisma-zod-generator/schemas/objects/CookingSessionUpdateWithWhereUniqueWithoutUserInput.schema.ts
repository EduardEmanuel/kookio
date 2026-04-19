import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionUpdateWithoutUserInputObjectSchema as CookingSessionUpdateWithoutUserInputObjectSchema } from './CookingSessionUpdateWithoutUserInput.schema';
import { CookingSessionUncheckedUpdateWithoutUserInputObjectSchema as CookingSessionUncheckedUpdateWithoutUserInputObjectSchema } from './CookingSessionUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CookingSessionUpdateWithoutUserInputObjectSchema),
        z.lazy(() => CookingSessionUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const CookingSessionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpdateWithWhereUniqueWithoutUserInput>;
export const CookingSessionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
