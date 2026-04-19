import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutCookingSessionsInputObjectSchema as RecipeCreateWithoutCookingSessionsInputObjectSchema } from './RecipeCreateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedCreateWithoutCookingSessionsInput.schema';
import { RecipeCreateOrConnectWithoutCookingSessionsInputObjectSchema as RecipeCreateOrConnectWithoutCookingSessionsInputObjectSchema } from './RecipeCreateOrConnectWithoutCookingSessionsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutCookingSessionsInputObjectSchema),
          z.lazy(
            () => RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => RecipeCreateOrConnectWithoutCookingSessionsInputObjectSchema,
        )
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
    })
    .strict();
export const RecipeCreateNestedOneWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.RecipeCreateNestedOneWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateNestedOneWithoutCookingSessionsInput>;
export const RecipeCreateNestedOneWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
