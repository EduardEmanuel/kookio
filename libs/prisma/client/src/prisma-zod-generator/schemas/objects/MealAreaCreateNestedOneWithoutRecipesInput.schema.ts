import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaCreateWithoutRecipesInputObjectSchema as MealAreaCreateWithoutRecipesInputObjectSchema } from './MealAreaCreateWithoutRecipesInput.schema';
import { MealAreaUncheckedCreateWithoutRecipesInputObjectSchema as MealAreaUncheckedCreateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedCreateWithoutRecipesInput.schema';
import { MealAreaCreateOrConnectWithoutRecipesInputObjectSchema as MealAreaCreateOrConnectWithoutRecipesInputObjectSchema } from './MealAreaCreateOrConnectWithoutRecipesInput.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './MealAreaWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => MealAreaCreateWithoutRecipesInputObjectSchema),
          z.lazy(() => MealAreaUncheckedCreateWithoutRecipesInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MealAreaCreateOrConnectWithoutRecipesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => MealAreaWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const MealAreaCreateNestedOneWithoutRecipesInputObjectSchema: z.ZodType<Prisma.MealAreaCreateNestedOneWithoutRecipesInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaCreateNestedOneWithoutRecipesInput>;
export const MealAreaCreateNestedOneWithoutRecipesInputObjectZodSchema =
  makeSchema();
