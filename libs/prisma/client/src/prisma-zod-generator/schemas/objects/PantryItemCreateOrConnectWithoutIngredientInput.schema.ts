import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PantryItemWhereUniqueInputObjectSchema as PantryItemWhereUniqueInputObjectSchema } from './PantryItemWhereUniqueInput.schema';
import { PantryItemCreateWithoutIngredientInputObjectSchema as PantryItemCreateWithoutIngredientInputObjectSchema } from './PantryItemCreateWithoutIngredientInput.schema';
import { PantryItemUncheckedCreateWithoutIngredientInputObjectSchema as PantryItemUncheckedCreateWithoutIngredientInputObjectSchema } from './PantryItemUncheckedCreateWithoutIngredientInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => PantryItemWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => PantryItemCreateWithoutIngredientInputObjectSchema),
        z.lazy(
          () => PantryItemUncheckedCreateWithoutIngredientInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const PantryItemCreateOrConnectWithoutIngredientInputObjectSchema: z.ZodType<Prisma.PantryItemCreateOrConnectWithoutIngredientInput> =
  makeSchema() as unknown as z.ZodType<Prisma.PantryItemCreateOrConnectWithoutIngredientInput>;
export const PantryItemCreateOrConnectWithoutIngredientInputObjectZodSchema =
  makeSchema();
