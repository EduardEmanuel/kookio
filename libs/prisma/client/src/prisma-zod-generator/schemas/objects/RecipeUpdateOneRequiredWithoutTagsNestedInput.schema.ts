import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutTagsInputObjectSchema as RecipeCreateWithoutTagsInputObjectSchema } from './RecipeCreateWithoutTagsInput.schema';
import { RecipeUncheckedCreateWithoutTagsInputObjectSchema as RecipeUncheckedCreateWithoutTagsInputObjectSchema } from './RecipeUncheckedCreateWithoutTagsInput.schema';
import { RecipeCreateOrConnectWithoutTagsInputObjectSchema as RecipeCreateOrConnectWithoutTagsInputObjectSchema } from './RecipeCreateOrConnectWithoutTagsInput.schema';
import { RecipeUpsertWithoutTagsInputObjectSchema as RecipeUpsertWithoutTagsInputObjectSchema } from './RecipeUpsertWithoutTagsInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateToOneWithWhereWithoutTagsInputObjectSchema as RecipeUpdateToOneWithWhereWithoutTagsInputObjectSchema } from './RecipeUpdateToOneWithWhereWithoutTagsInput.schema';
import { RecipeUpdateWithoutTagsInputObjectSchema as RecipeUpdateWithoutTagsInputObjectSchema } from './RecipeUpdateWithoutTagsInput.schema';
import { RecipeUncheckedUpdateWithoutTagsInputObjectSchema as RecipeUncheckedUpdateWithoutTagsInputObjectSchema } from './RecipeUncheckedUpdateWithoutTagsInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutTagsInputObjectSchema),
          z.lazy(() => RecipeUncheckedCreateWithoutTagsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RecipeCreateOrConnectWithoutTagsInputObjectSchema)
        .optional(),
      upsert: z.lazy(() => RecipeUpsertWithoutTagsInputObjectSchema).optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => RecipeUpdateToOneWithWhereWithoutTagsInputObjectSchema),
          z.lazy(() => RecipeUpdateWithoutTagsInputObjectSchema),
          z.lazy(() => RecipeUncheckedUpdateWithoutTagsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const RecipeUpdateOneRequiredWithoutTagsNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutTagsNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutTagsNestedInput>;
export const RecipeUpdateOneRequiredWithoutTagsNestedInputObjectZodSchema =
  makeSchema();
