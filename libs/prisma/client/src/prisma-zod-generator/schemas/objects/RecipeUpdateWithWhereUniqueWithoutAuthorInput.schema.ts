import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateWithoutAuthorInputObjectSchema as RecipeUpdateWithoutAuthorInputObjectSchema } from './RecipeUpdateWithoutAuthorInput.schema';
import { RecipeUncheckedUpdateWithoutAuthorInputObjectSchema as RecipeUncheckedUpdateWithoutAuthorInputObjectSchema } from './RecipeUncheckedUpdateWithoutAuthorInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutAuthorInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateWithoutAuthorInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateWithWhereUniqueWithoutAuthorInputObjectSchema: z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutAuthorInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateWithWhereUniqueWithoutAuthorInput>;
export const RecipeUpdateWithWhereUniqueWithoutAuthorInputObjectZodSchema =
  makeSchema();
