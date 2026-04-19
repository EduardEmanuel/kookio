import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionCreateWithoutUserInputObjectSchema as CookingSessionCreateWithoutUserInputObjectSchema } from './CookingSessionCreateWithoutUserInput.schema';
import { CookingSessionUncheckedCreateWithoutUserInputObjectSchema as CookingSessionUncheckedCreateWithoutUserInputObjectSchema } from './CookingSessionUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CookingSessionCreateWithoutUserInputObjectSchema),
        z.lazy(() => CookingSessionUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const CookingSessionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateOrConnectWithoutUserInput>;
export const CookingSessionCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
