import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeSelectObjectSchema as RecipeSelectObjectSchema } from './objects/RecipeSelect.schema';
import { RecipeIncludeObjectSchema as RecipeIncludeObjectSchema } from './objects/RecipeInclude.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';

export const RecipeFindUniqueOrThrowSchema: z.ZodType<Prisma.RecipeFindUniqueOrThrowArgs> =
  z
    .object({
      select: RecipeSelectObjectSchema.optional(),
      include: RecipeIncludeObjectSchema.optional(),
      where: RecipeWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeFindUniqueOrThrowArgs>;

export const RecipeFindUniqueOrThrowZodSchema = z
  .object({
    select: RecipeSelectObjectSchema.optional(),
    include: RecipeIncludeObjectSchema.optional(),
    where: RecipeWhereUniqueInputObjectSchema,
  })
  .strict();
