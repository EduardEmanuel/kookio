import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutAreaInputObjectSchema as RecipeUpdateWithoutAreaInputObjectSchema } from './RecipeUpdateWithoutAreaInput.schema';
import { RecipeUncheckedUpdateWithoutAreaInputObjectSchema as RecipeUncheckedUpdateWithoutAreaInputObjectSchema } from './RecipeUncheckedUpdateWithoutAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutAreaInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutAreaInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateWithWhereUniqueWithoutAreaInputObjectSchema: z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutAreaInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutAreaInput>;
export const RecipeUpdateWithWhereUniqueWithoutAreaInputObjectZodSchema =
  makeSchema();
