import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemUpdateWithoutUserInputObjectSchema as PantryItemUpdateWithoutUserInputObjectSchema } from './PantryItemUpdateWithoutUserInput.schema';
import { PantryItemUncheckedUpdateWithoutUserInputObjectSchema as PantryItemUncheckedUpdateWithoutUserInputObjectSchema } from './PantryItemUncheckedUpdateWithoutUserInput.schema';
import { PantryItemCreateWithoutUserInputObjectSchema as PantryItemCreateWithoutUserInputObjectSchema } from './PantryItemCreateWithoutUserInput.schema';
import { PantryItemUncheckedCreateWithoutUserInputObjectSchema as PantryItemUncheckedCreateWithoutUserInputObjectSchema } from './PantryItemUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => PantryItemUpdateWithoutUserInputObjectSchema),
        z.lazy(() => PantryItemUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => PantryItemCreateWithoutUserInputObjectSchema),
        z.lazy(() => PantryItemUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const PantryItemUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PantryItemUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpsertWithWhereUniqueWithoutUserInput>;
export const PantryItemUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
