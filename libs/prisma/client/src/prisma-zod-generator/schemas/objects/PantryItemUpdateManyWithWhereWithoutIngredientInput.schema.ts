import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemScalarWhereInputObjectSchema as PantryItemScalarWhereInputObjectSchema } from './PantryItemScalarWhereInput.schema';
import { PantryItemUpdateManyMutationInputObjectSchema as PantryItemUpdateManyMutationInputObjectSchema } from './PantryItemUpdateManyMutationInput.schema';
import { PantryItemUncheckedUpdateManyWithoutIngredientInputObjectSchema as PantryItemUncheckedUpdateManyWithoutIngredientInputObjectSchema } from './PantryItemUncheckedUpdateManyWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => PantryItemUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => PantryItemUncheckedUpdateManyWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const PantryItemUpdateManyWithWhereWithoutIngredientInputObjectSchema: z.ZodType<Prisma.PantryItemUpdateManyWithWhereWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemUpdateManyWithWhereWithoutIngredientInput>;
export const PantryItemUpdateManyWithWhereWithoutIngredientInputObjectZodSchema =
  makeSchema();
