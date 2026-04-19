import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionWhereUniqueInputObjectSchema as CookingSessionWhereUniqueInputObjectSchema } from './CookingSessionWhereUniqueInput.schema';
import { CookingSessionCreateWithoutRecipeInputObjectSchema as CookingSessionCreateWithoutRecipeInputObjectSchema } from './CookingSessionCreateWithoutRecipeInput.schema';
import { CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema as CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedCreateWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CookingSessionCreateWithoutRecipeInputObjectSchema),
        z.lazy(
          () => CookingSessionUncheckedCreateWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const CookingSessionCreateOrConnectWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateOrConnectWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateOrConnectWithoutRecipeInput>;
export const CookingSessionCreateOrConnectWithoutRecipeInputObjectZodSchema =
  makeSchema();
