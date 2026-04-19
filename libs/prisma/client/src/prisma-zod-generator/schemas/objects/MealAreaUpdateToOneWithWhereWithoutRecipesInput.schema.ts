import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './MealAreaWhereInput.schema';
import { MealAreaUpdateWithoutRecipesInputObjectSchema as MealAreaUpdateWithoutRecipesInputObjectSchema } from './MealAreaUpdateWithoutRecipesInput.schema';
import { MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema as MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedUpdateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealAreaWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => MealAreaUpdateWithoutRecipesInputObjectSchema),
        z.lazy(() => MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema),
      ]),
    })
    .strict();
export const MealAreaUpdateToOneWithWhereWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealAreaUpdateToOneWithWhereWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaUpdateToOneWithWhereWithoutRecipesInput>;
export const MealAreaUpdateToOneWithWhereWithoutRecipesInputObjectZodSchema =
  makeSchema();
