import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './MealAreaWhereUniqueInput.schema';
import { MealAreaCreateWithoutRecipesInputObjectSchema as MealAreaCreateWithoutRecipesInputObjectSchema } from './MealAreaCreateWithoutRecipesInput.schema';
import { MealAreaUncheckedCreateWithoutRecipesInputObjectSchema as MealAreaUncheckedCreateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedCreateWithoutRecipesInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => MealAreaWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => MealAreaCreateWithoutRecipesInputObjectSchema),
        z.lazy(() => MealAreaUncheckedCreateWithoutRecipesInputObjectSchema),
      ]),
    })
    .strict();
export const MealAreaCreateOrConnectWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealAreaCreateOrConnectWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCreateOrConnectWithoutRecipesInput>;
export const MealAreaCreateOrConnectWithoutRecipesInputObjectZodSchema =
  makeSchema();
