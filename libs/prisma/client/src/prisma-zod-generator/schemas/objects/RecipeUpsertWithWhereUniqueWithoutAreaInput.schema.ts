import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutAreaInputObjectSchema as RecipeUpdateWithoutAreaInputObjectSchema } from './RecipeUpdateWithoutAreaInput.schema';
import { RecipeUncheckedUpdateWithoutAreaInputObjectSchema as RecipeUncheckedUpdateWithoutAreaInputObjectSchema } from './RecipeUncheckedUpdateWithoutAreaInput.schema';
import { RecipeCreateWithoutAreaInputObjectSchema as RecipeCreateWithoutAreaInputObjectSchema } from './RecipeCreateWithoutAreaInput.schema';
import { RecipeUncheckedCreateWithoutAreaInputObjectSchema as RecipeUncheckedCreateWithoutAreaInputObjectSchema } from './RecipeUncheckedCreateWithoutAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutAreaInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutAreaInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutAreaInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutAreaInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpsertWithWhereUniqueWithoutAreaInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutAreaInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutAreaInput>;
export const RecipeUpsertWithWhereUniqueWithoutAreaInputObjectZodSchema =
  makeSchema();
