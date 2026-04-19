import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './RecipeUpdateManyMutationInput.schema';
import { RecipeUncheckedUpdateManyWithoutAuthorInputObjectSchema as RecipeUncheckedUpdateManyWithoutAuthorInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutAuthorInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeUpdateManyMutationInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateManyWithoutAuthorInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateManyWithWhereWithoutAuthorInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutAuthorInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutAuthorInput>;
export const RecipeUpdateManyWithWhereWithoutAuthorInputObjectZodSchema =
  makeSchema();
