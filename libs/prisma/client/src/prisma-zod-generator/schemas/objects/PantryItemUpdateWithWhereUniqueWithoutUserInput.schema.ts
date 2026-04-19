import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemUpdateWithoutUserInputObjectSchema as PantryItemUpdateWithoutUserInputObjectSchema } from './PantryItemUpdateWithoutUserInput.schema';
import { PantryItemUncheckedUpdateWithoutUserInputObjectSchema as PantryItemUncheckedUpdateWithoutUserInputObjectSchema } from './PantryItemUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => PantryItemUpdateWithoutUserInputObjectSchema),
        z.lazy(() => PantryItemUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();
export const PantryItemUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PantryItemUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpdateWithWhereUniqueWithoutUserInput>;
export const PantryItemUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
