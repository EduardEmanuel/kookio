import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MealAreaCreateWithoutRecipesInputObjectSchema as MealAreaCreateWithoutRecipesInputObjectSchema } from './MealAreaCreateWithoutRecipesInput.schema';
import { MealAreaUncheckedCreateWithoutRecipesInputObjectSchema as MealAreaUncheckedCreateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedCreateWithoutRecipesInput.schema';
import { MealAreaCreateOrConnectWithoutRecipesInputObjectSchema as MealAreaCreateOrConnectWithoutRecipesInputObjectSchema } from './MealAreaCreateOrConnectWithoutRecipesInput.schema';
import { MealAreaUpsertWithoutRecipesInputObjectSchema as MealAreaUpsertWithoutRecipesInputObjectSchema } from './MealAreaUpsertWithoutRecipesInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './MealAreaWhereInput.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './MealAreaWhereUniqueInput.schema';
import { MealAreaUpdateToOneWithWhereWithoutRecipesInputObjectSchema as MealAreaUpdateToOneWithWhereWithoutRecipesInputObjectSchema } from './MealAreaUpdateToOneWithWhereWithoutRecipesInput.schema';
import { MealAreaUpdateWithoutRecipesInputObjectSchema as MealAreaUpdateWithoutRecipesInputObjectSchema } from './MealAreaUpdateWithoutRecipesInput.schema';
import { MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema as MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema } from './MealAreaUncheckedUpdateWithoutRecipesInput.schema';

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
      upsert: z
        .lazy(() => MealAreaUpsertWithoutRecipesInputObjectSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => MealAreaWhereInputObjectSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => MealAreaWhereInputObjectSchema)])
        .optional(),
      connect: z.lazy(() => MealAreaWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => MealAreaUpdateToOneWithWhereWithoutRecipesInputObjectSchema,
          ),
          z.lazy(() => MealAreaUpdateWithoutRecipesInputObjectSchema),
          z.lazy(() => MealAreaUncheckedUpdateWithoutRecipesInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const MealAreaUpdateOneWithoutRecipesNestedInputObjectSchema: z.ZodType<Prisma.MealAreaUpdateOneWithoutRecipesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.MealAreaUpdateOneWithoutRecipesNestedInput>;
export const MealAreaUpdateOneWithoutRecipesNestedInputObjectZodSchema =
  makeSchema();
