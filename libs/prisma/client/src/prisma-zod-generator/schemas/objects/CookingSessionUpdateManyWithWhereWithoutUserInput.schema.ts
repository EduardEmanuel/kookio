import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionScalarWhereInputObjectSchema as CookingSessionScalarWhereInputObjectSchema } from './CookingSessionScalarWhereInput.schema';
import { CookingSessionUpdateManyMutationInputObjectSchema as CookingSessionUpdateManyMutationInputObjectSchema } from './CookingSessionUpdateManyMutationInput.schema';
import { CookingSessionUncheckedUpdateManyWithoutUserInputObjectSchema as CookingSessionUncheckedUpdateManyWithoutUserInputObjectSchema } from './CookingSessionUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => CookingSessionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CookingSessionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CookingSessionUncheckedUpdateManyWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const CookingSessionUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionUpdateManyWithWhereWithoutUserInput>;
export const CookingSessionUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
