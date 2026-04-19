import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaUpdateWithoutRecipesInputObjectSchema as MealAreaUpdateWithoutRecipesInputObjectSchema } from './MealAreaUpdateWithoutRecipesInput.schema';
import { MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema as MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedUpdateWithoutRecipesInput.schema';
import { MealAreaCreateWithoutRecipesInputObjectSchema as MealAreaCreateWithoutRecipesInputObjectSchema } from './MealAreaCreateWithoutRecipesInput.schema';
import { MealAreaUncheckedCreateWithoutRecipesInputObjectSchema as MealAreaUncheckedCreateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedCreateWithoutRecipesInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './MealAreaWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => MealAreaUpdateWithoutRecipesInputObjectSchema),
        z.lazy(() => MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => MealAreaCreateWithoutRecipesInputObjectSchema),
        z.lazy(() => MealAreaUncheckedCreateWithoutRecipesInputObjectSchema),
      ]),
      where: z.lazy(() => MealAreaWhereInputObjectSchema).optional(),
    })
    .strict();
export const MealAreaUpsertWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealAreaUpsertWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaUpsertWithoutRecipesInput>;
export const MealAreaUpsertWithoutRecipesInputObjectZodSchema = makeSchema();
