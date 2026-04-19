import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemUpdateWithoutIngredientInputObjectSchema as PantryItemUpdateWithoutIngredientInputObjectSchema } from './PantryItemUpdateWithoutIngredientInput.schema';
import { PantryItemUncheckedUpdateWithoutIngredientInputObjectSchema as PantryItemUncheckedUpdateWithoutIngredientInputObjectSchema } from './PantryItemUncheckedUpdateWithoutIngredientInput.schema';
import { PantryItemCreateWithoutIngredientInputObjectSchema as PantryItemCreateWithoutIngredientInputObjectSchema } from './PantryItemCreateWithoutIngredientInput.schema';
import { PantryItemUncheckedCreateWithoutIngredientInputObjectSchema as PantryItemUncheckedCreateWithoutIngredientInputObjectSchema } from './PantryItemUncheckedCreateWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => PantryItemUpdateWithoutIngredientInputObjectSchema),
        z.lazy(
          () => PantryItemUncheckedUpdateWithoutIngredientInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => PantryItemCreateWithoutIngredientInputObjectSchema),
        z.lazy(
          () => PantryItemUncheckedCreateWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const PantryItemUpsertWithWhereUniqueWithoutIngredientInputObjectSchema: z.ZodType<Prisma.PantryItemUpsertWithWhereUniqueWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpsertWithWhereUniqueWithoutIngredientInput>;
export const PantryItemUpsertWithWhereUniqueWithoutIngredientInputObjectZodSchema =
  makeSchema();
