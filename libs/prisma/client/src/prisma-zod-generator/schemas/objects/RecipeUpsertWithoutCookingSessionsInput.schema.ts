import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeUpdateWithoutCookingSessionsInputObjectSchema as RecipeUpdateWithoutCookingSessionsInputObjectSchema } from './RecipeUpdateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedUpdateWithoutCookingSessionsInput.schema';
import { RecipeCreateWithoutCookingSessionsInputObjectSchema as RecipeCreateWithoutCookingSessionsInputObjectSchema } from './RecipeCreateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedCreateWithoutCookingSessionsInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './RecipeWhereInput.schema';

const makeSchema = () =>
  z
    .object({
      update: z.union([
        z.lazy(() => RecipeUpdateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
      where: z.lazy(() => RecipeWhereInputObjectSchema).optional(),
    })
    .strict();
export const RecipeUpsertWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.RecipeUpsertWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpsertWithoutCookingSessionsInput>;
export const RecipeUpsertWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
