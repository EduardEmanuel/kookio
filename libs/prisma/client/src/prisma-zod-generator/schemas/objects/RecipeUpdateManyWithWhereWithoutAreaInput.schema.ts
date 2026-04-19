import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeScalarWhereInputObjectSchema as RecipeScalarWhereInputObjectSchema } from './RecipeScalarWhereInput.schema';
import { RecipeUpdateManyMutationInputObjectSchema as RecipeUpdateManyMutationInputObjectSchema } from './RecipeUpdateManyMutationInput.schema';
import { RecipeUncheckedUpdateManyWithoutAreaInputObjectSchema as RecipeUncheckedUpdateManyWithoutAreaInputObjectSchema } from './RecipeUncheckedUpdateManyWithoutAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RecipeUpdateManyMutationInputObjectSchema),
        z.lazy(() => RecipeUncheckedUpdateManyWithoutAreaInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeUpdateManyWithWhereWithoutAreaInputObjectSchema: z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutAreaInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateManyWithWhereWithoutAreaInput>;
export const RecipeUpdateManyWithWhereWithoutAreaInputObjectZodSchema =
  makeSchema();
