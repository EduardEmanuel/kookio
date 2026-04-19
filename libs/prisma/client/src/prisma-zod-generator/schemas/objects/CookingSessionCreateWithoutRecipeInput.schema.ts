import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCookingSessionsInputObjectSchema as UserCreateNestedOneWithoutCookingSessionsInputObjectSchema } from './UserCreateNestedOneWithoutCookingSessionsInput.schema';

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
    })
    .strict();
export const CookingSessionCreateWithoutRecipeInputObjectSchema: z.ZodType<Prisma.CookingSessionCreateWithoutRecipeInput> =
  makeSchema() as unknown as z.ZodType<Prisma.CookingSessionCreateWithoutRecipeInput>;
export const CookingSessionCreateWithoutRecipeInputObjectZodSchema =
  makeSchema();
