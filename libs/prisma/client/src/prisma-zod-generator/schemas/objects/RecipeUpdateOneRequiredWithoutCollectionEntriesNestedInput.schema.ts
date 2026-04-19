import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeCreateWithoutCollectionEntriesInputObjectSchema as RecipeCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedCreateWithoutCollectionEntriesInput.schema';
import { RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema as RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema } from './RecipeCreateOrConnectWithoutCollectionEntriesInput.schema';
import { RecipeUpsertWithoutCollectionEntriesInputObjectSchema as RecipeUpsertWithoutCollectionEntriesInputObjectSchema } from './RecipeUpsertWithoutCollectionEntriesInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeUpdateToOneWithWhereWithoutCollectionEntriesInputObjectSchema as RecipeUpdateToOneWithWhereWithoutCollectionEntriesInputObjectSchema } from './RecipeUpdateToOneWithWhereWithoutCollectionEntriesInput.schema';
import { RecipeUpdateWithoutCollectionEntriesInputObjectSchema as RecipeUpdateWithoutCollectionEntriesInputObjectSchema } from './RecipeUpdateWithoutCollectionEntriesInput.schema';
import { RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema as RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema } from './RecipeUncheckedUpdateWithoutCollectionEntriesInput.schema';

const makeSchema = () =>
  z
    .object({
      create: z
        .union([
          z.lazy(() => RecipeCreateWithoutCollectionEntriesInputObjectSchema),
          z.lazy(
            () =>
              RecipeUncheckedCreateWithoutCollectionEntriesInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(
          () => RecipeCreateOrConnectWithoutCollectionEntriesInputObjectSchema,
        )
        .optional(),
      upsert: z
        .lazy(() => RecipeUpsertWithoutCollectionEntriesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => RecipeWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(
            () =>
              RecipeUpdateToOneWithWhereWithoutCollectionEntriesInputObjectSchema,
          ),
          z.lazy(() => RecipeUpdateWithoutCollectionEntriesInputObjectSchema),
          z.lazy(
            () =>
              RecipeUncheckedUpdateWithoutCollectionEntriesInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();
export const RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInputObjectSchema: z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInput>;
export const RecipeUpdateOneRequiredWithoutCollectionEntriesNestedInputObjectZodSchema =
  makeSchema();
