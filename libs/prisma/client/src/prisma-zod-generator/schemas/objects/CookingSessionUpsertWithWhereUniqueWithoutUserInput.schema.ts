import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionUpdateWithoutUserInputObjectSchema as CookingSessionUpdateWithoutUserInputObjectSchema } from './CookingSessionUpdateWithoutUserInput.schema';
import { CookingSessionUncheckedUpdateWithoutUserInputObjectSchema as CookingSessionUncheckedUpdateWithoutUserInputObjectSchema } from './CookingSessionUncheckedUpdateWithoutUserInput.schema';
import { CookingSessionCreateWithoutUserInputObjectSchema as CookingSessionCreateWithoutUserInputObjectSchema } from './CookingSessionCreateWithoutUserInput.schema';
import { CookingSessionUncheckedCreateWithoutUserInputObjectSchema as CookingSessionUncheckedCreateWithoutUserInputObjectSchema } from './CookingSessionUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CookingSessionUpdateWithoutUserInputObjectSchema),
        z.lazy(() => CookingSessionUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CookingSessionCreateWithoutUserInputObjectSchema),
        z.lazy(() => CookingSessionUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const CookingSessionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpsertWithWhereUniqueWithoutUserInput>;
export const CookingSessionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
