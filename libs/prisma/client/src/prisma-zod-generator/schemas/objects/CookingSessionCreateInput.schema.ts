import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCookingSessionsInputObjectSchema as UserCreateNestedOneWithoutCookingSessionsInputObjectSchema } from './UserCreateNestedOneWithoutCookingSessionsInput.schema';
import { RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema as RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema } from './RecipeCreateNestedOneWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      servings: z.number().int(),
      completedAt: z.coerce.date().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutCookingSessionsInputObjectSchema,
      ),
      recipe: z.lazy(
        () => RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema,
      ),
    })
    .strict();
export const CookingSessionCreateInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateInput>;
export const CookingSessionCreateInputObjectZodSchema = makeSchema();
