import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutAuthorInputObjectSchema as RecipeUpdateWithoutAuthorInputObjectSchema } from './RecipeUpdateWithoutAuthorInput.schema';
import { RecipeUncheckedUpdateWithoutAuthorInputObjectSchema as RecipeUncheckedUpdateWithoutAuthorInputObjectSchema } from './RecipeUncheckedUpdateWithoutAuthorInput.schema';
import { RecipeCreateWithoutAuthorInputObjectSchema as RecipeCreateWithoutAuthorInputObjectSchema } from './RecipeCreateWithoutAuthorInput.schema';
import { RecipeUncheckedCreateWithoutAuthorInputObjectSchema as RecipeUncheckedCreateWithoutAuthorInputObjectSchema } from './RecipeUncheckedCreateWithoutAuthorInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutAuthorInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutAuthorInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutAuthorInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpsertWithWhereUniqueWithoutAuthorInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutAuthorInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithWhereUniqueWithoutAuthorInput>;
export const RecipeUpsertWithWhereUniqueWithoutAuthorInputObjectZodSchema =
  makeSchema();
