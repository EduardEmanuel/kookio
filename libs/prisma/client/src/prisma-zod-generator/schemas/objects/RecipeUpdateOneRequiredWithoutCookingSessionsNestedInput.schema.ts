import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutCookingSessionsInputObjectSchema as RecipeCreateWithoutCookingSessionsInputObjectSchema } from './RecipeCreateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedCreateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedCreateWithoutCookingSessionsInput.schema';
import { RecipeCreateOrConnectWithoutCookingSessionsInputObjectSchema as RecipeCreateOrConnectWithoutCookingSessionsInputObjectSchema } from './RecipeCreateOrConnectWithoutCookingSessionsInput.schema';
import { RecipeUpsertWithoutCookingSessionsInputObjectSchema as RecipeUpsertWithoutCookingSessionsInputObjectSchema } from './RecipeUpsertWithoutCookingSessionsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema as RecipeUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema } from './RecipeUpdateToOneWithWhereWithoutCookingSessionsInput.schema';
import { RecipeUpdateWithoutCookingSessionsInputObjectSchema as RecipeUpdateWithoutCookingSessionsInputObjectSchema } from './RecipeUpdateWithoutCookingSessionsInput.schema';
import { RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema as RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema } from './RecipeUncheckedUpdateWithoutCookingSessionsInput.schema';

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
      upsert: z
        .lazy(() => RecipeUpsertWithoutCookingSessionsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeUpdateToOneWithWhereWithoutCookingSessionsInputObjectSchema,
          ),
          z.lazy(() => RecipeUpdateWithoutCookingSessionsInputObjectSchema),
          z.lazy(
            () => RecipeUncheckedUpdateWithoutCookingSessionsInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const RecipeUpdateOneRequiredWithoutCookingSessionsNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutCookingSessionsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutCookingSessionsNestedInput>;
export const RecipeUpdateOneRequiredWithoutCookingSessionsNestedInputObjectZodSchema =
  makeSchema();
