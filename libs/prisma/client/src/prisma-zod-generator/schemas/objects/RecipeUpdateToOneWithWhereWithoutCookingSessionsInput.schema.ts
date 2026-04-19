import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';
import { RecipeUpdateWithoutCookingSessionsInputObjectSchema as RecipeUpdateWithoutCookingSessionsInputObjectSchema } from './RecipeUpdateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedUpdateWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
      data: z.union([
        z.lazy(() => RecipeUpdateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateToOneWithWhereWithoutCookingSessionsInput>;
export const RecipeUpdateToOneWithWhereWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
