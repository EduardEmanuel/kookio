import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutAreaInputObjectSchema as RecipeCreateWithoutAreaInputObjectSchema } from './RecipeCreateWithoutAreaInput.schema';
import { RecipeUncheckedCreateWithoutAreaInputObjectSchema as RecipeUncheckedCreateWithoutAreaInputObjectSchema } from './RecipeUncheckedCreateWithoutAreaInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutAreaInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutAreaInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutAreaInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutAreaInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutAreaInput>;
export const RecipeCreateOrConnectWithoutAreaInputObjectZodSchema =
  makeSchema();
