import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './RecipeWhereUniqueInput.schema';
import { RecipeCreateWithoutAuthorInputObjectSchema as RecipeCreateWithoutAuthorInputObjectSchema } from './RecipeCreateWithoutAuthorInput.schema';
import { RecipeUncheckedCreateWithoutAuthorInputObjectSchema as RecipeUncheckedCreateWithoutAuthorInputObjectSchema } from './RecipeUncheckedCreateWithoutAuthorInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => RecipeWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RecipeCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => RecipeUncheckedCreateWithoutAuthorInputObjectSchema),
      ]),
    })
    .strict();
export const RecipeCreateOrConnectWithoutAuthorInputObjectSchema: z.ZodType<Prisma.RecipeCreateOrConnectWithoutAuthorInput> =
  makeSchema() as unknown as z.ZodType<Prisma.RecipeCreateOrConnectWithoutAuthorInput>;
export const RecipeCreateOrConnectWithoutAuthorInputObjectZodSchema =
  makeSchema();
