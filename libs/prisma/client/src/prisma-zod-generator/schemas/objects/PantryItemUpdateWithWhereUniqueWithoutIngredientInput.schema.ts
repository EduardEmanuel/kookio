import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemUpdateWithoutIngredientInputObjectSchema as PantryItemUpdateWithoutIngredientInputObjectSchema } from './PantryItemUpdateWithoutIngredientInput.schema';
import { PantryItemUncheckedUpdateWithoutIngredientInputObjectSchema as PantryItemUncheckedUpdateWithoutIngredientInputObjectSchema } from './PantryItemUncheckedUpdateWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => PantryItemUpdateWithoutIngredientInputObjectSchema),
        z.lazy(
          () => PantryItemUncheckedUpdateWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const PantryItemUpdateWithWhereUniqueWithoutIngredientInputObjectSchema: z.ZodType<Prisma.PantryItemUpdateWithWhereUniqueWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpdateWithWhereUniqueWithoutIngredientInput>;
export const PantryItemUpdateWithWhereUniqueWithoutIngredientInputObjectZodSchema =
  makeSchema();
