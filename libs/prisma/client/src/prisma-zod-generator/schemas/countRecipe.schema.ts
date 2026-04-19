import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './objects/RecipeOrderByWithRelationInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';
import { RecipeCountAggregateInputObjectSchema as RecipeCountAggregateInputObjectSchema } from './objects/RecipeCountAggregateInput.schema';

export const RecipeCountSchema: z.ZodType<Prisma.RecipeCountArgs> = z
  .object({
    orderBy: z
      .union([
        RecipeOrderByWithRelationInputObjectSchema,
        RecipeOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeWhereInputObjectSchema.optional(),
    cursor: RecipeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), RecipeCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeCountArgs>;

export const RecipeCountZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeOrderByWithRelationInputObjectSchema,
        RecipeOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeWhereInputObjectSchema.optional(),
    cursor: RecipeWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), RecipeCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
