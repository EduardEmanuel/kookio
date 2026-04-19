import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeOrderByWithRelationInputObjectSchema as RecipeOrderByWithRelationInputObjectSchema } from './objects/RecipeOrderByWithRelationInput.schema';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';
import { RecipeWhereUniqueInputObjectSchema as RecipeWhereUniqueInputObjectSchema } from './objects/RecipeWhereUniqueInput.schema';
import { RecipeCountAggregateInputObjectSchema as RecipeCountAggregateInputObjectSchema } from './objects/RecipeCountAggregateInput.schema';
import { RecipeMinAggregateInputObjectSchema as RecipeMinAggregateInputObjectSchema } from './objects/RecipeMinAggregateInput.schema';
import { RecipeMaxAggregateInputObjectSchema as RecipeMaxAggregateInputObjectSchema } from './objects/RecipeMaxAggregateInput.schema';
import { RecipeAvgAggregateInputObjectSchema as RecipeAvgAggregateInputObjectSchema } from './objects/RecipeAvgAggregateInput.schema';
import { RecipeSumAggregateInputObjectSchema as RecipeSumAggregateInputObjectSchema } from './objects/RecipeSumAggregateInput.schema';

export const RecipeAggregateSchema: z.ZodType<Prisma.RecipeAggregateArgs> = z
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
    _count: z
      .union([z.literal(true), RecipeCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeMinAggregateInputObjectSchema.optional(),
    _max: RecipeMaxAggregateInputObjectSchema.optional(),
    _avg: RecipeAvgAggregateInputObjectSchema.optional(),
    _sum: RecipeSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeAggregateArgs>;

export const RecipeAggregateZodSchema = z
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
    _count: z
      .union([z.literal(true), RecipeCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeMinAggregateInputObjectSchema.optional(),
    _max: RecipeMaxAggregateInputObjectSchema.optional(),
    _avg: RecipeAvgAggregateInputObjectSchema.optional(),
    _sum: RecipeSumAggregateInputObjectSchema.optional(),
  })
  .strict();
