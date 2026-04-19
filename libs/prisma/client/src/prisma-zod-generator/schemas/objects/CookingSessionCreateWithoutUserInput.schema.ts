import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema as RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema } from './RecipeCreateNestedOneWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      servings: z.number().int(),
      completedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      recipe: z.lazy(
        () => RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema,
      ),
    })
    .strict();
export const CookingSessionCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateWithoutUserInput>;
export const CookingSessionCreateWithoutUserInputObjectZodSchema = makeSchema();
