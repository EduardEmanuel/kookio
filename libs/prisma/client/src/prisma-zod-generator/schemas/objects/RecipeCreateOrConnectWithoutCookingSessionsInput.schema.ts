import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutCookingSessionsInputObjectSchema as RecipeCreateWithoutCookingSessionsInputObjectSchema } from './RecipeCreateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedCreateWithoutCookingSessionsInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutCookingSessionsInputObjectSchema),
        z.lazy(
          () => RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutCookingSessionsInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutCookingSessionsInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutCookingSessionsInput>;
export const RecipeCreateOrConnectWithoutCookingSessionsInputObjectZodSchema =
  makeSchema();
