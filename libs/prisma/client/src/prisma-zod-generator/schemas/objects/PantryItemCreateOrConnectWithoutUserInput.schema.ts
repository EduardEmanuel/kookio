import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemCreateWithoutUserInputObjectSchema as PantryItemCreateWithoutUserInputObjectSchema } from './PantryItemCreateWithoutUserInput.schema';
import { PantryItemUncheckedCreateWithoutUserInputObjectSchema as PantryItemUncheckedCreateWithoutUserInputObjectSchema } from './PantryItemUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => PantryItemCreateWithoutUserInputObjectSchema),
        z.lazy(() => PantryItemUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const PantryItemCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PantryItemCreateOrConnectWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateOrConnectWithoutUserInput>;
export const PantryItemCreateOrConnectWithoutUserInputObjectZodSchema =
  makeSchema();
