import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionScalarWhereInputObjectSchema as CookingSessionScalarWhereInputObjectSchema } from './CookingSessionScalarWhereInput.schema';
import { CookingSessionUpdateManyMutationInputObjectSchema as CookingSessionUpdateManyMutationInputObjectSchema } from './CookingSessionUpdateManyMutationInput.schema';
import { CookingSessionUncheckedUpdateManyWithoutRecipeInputObjectSchema as CookingSessionUncheckedUpdateManyWithoutRecipeInputObjectSchema } from './CookingSessionUncheckedUpdateManyWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CookingSessionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CookingSessionUncheckedUpdateManyWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const CookingSessionUpdateManyWithWhereWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionUpdateManyWithWhereWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpdateManyWithWhereWithoutRecipeInput>;
export const CookingSessionUpdateManyWithWhereWithoutRecipeInputObjectZodSchema =
  makeSchema();
