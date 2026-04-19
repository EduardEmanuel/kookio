import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeTagScalarWhereInputObjectSchema as RecipeTagScalarWhereInputObjectSchema } from './RecipeTagScalarWhereInput.schema';
import { RecipeTagUpdateManyMutationInputObjectSchema as RecipeTagUpdateManyMutationInputObjectSchema } from './RecipeTagUpdateManyMutationInput.schema';
import { RecipeTagUncheckedUpdateManyWithoutRecipeInputObjectSchema as RecipeTagUncheckedUpdateManyWithoutRecipeInputObjectSchema } from './RecipeTagUncheckedUpdateManyWithoutRecipeInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeTagScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeTagUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => RecipeTagUncheckedUpdateManyWithoutRecipeInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeTagUpdateManyWithWhereWithoutRecipeInputObjectSchema: z.ZodType<Prisma.RecipeTagUpdateManyWithWhereWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeTagUpdateManyWithWhereWithoutRecipeInput>;
export const RecipeTagUpdateManyWithWhereWithoutRecipeInputObjectZodSchema =
  makeSchema();
