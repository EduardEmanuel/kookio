import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeWhereInputObjectSchema as RecipeWhereInputObjectSchema } from './objects/RecipeWhereInput.schema';
import { RecipeOrderByWithAggregationInputObjectSchema as RecipeOrderByWithAggregationInputObjectSchema } from './objects/RecipeOrderByWithAggregationInput.schema';
import { RecipeScalarWhereWithAggregatesInputObjectSchema as RecipeScalarWhereWithAggregatesInputObjectSchema } from './objects/RecipeScalarWhereWithAggregatesInput.schema';
import { RecipeScalarFieldEnumSchema } from './enums/RecipeScalarFieldEnum.schema';
import { RecipeCountAggregateInputObjectSchema as RecipeCountAggregateInputObjectSchema } from './objects/RecipeCountAggregateInput.schema';
import { RecipeMinAggregateInputObjectSchema as RecipeMinAggregateInputObjectSchema } from './objects/RecipeMinAggregateInput.schema';
import { RecipeMaxAggregateInputObjectSchema as RecipeMaxAggregateInputObjectSchema } from './objects/RecipeMaxAggregateInput.schema';
import { RecipeAvgAggregateInputObjectSchema as RecipeAvgAggregateInputObjectSchema } from './objects/RecipeAvgAggregateInput.schema';
import { RecipeSumAggregateInputObjectSchema as RecipeSumAggregateInputObjectSchema } from './objects/RecipeSumAggregateInput.schema';

export const RecipeGroupBySchema: z.ZodType<Prisma.RecipeGroupByArgs> = z
  .object({
    where: RecipeWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeOrderByWithAggregationInputObjectSchema,
        RecipeOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: RecipeScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RecipeCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeMinAggregateInputObjectSchema.optional(),
    _max: RecipeMaxAggregateInputObjectSchema.optional(),
    _avg: RecipeAvgAggregateInputObjectSchema.optional(),
    _sum: RecipeSumAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeGroupByArgs>;

export const RecipeGroupByZodSchema = z
  .object({
    where: RecipeWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeOrderByWithAggregationInputObjectSchema,
        RecipeOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: RecipeScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RecipeCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeMinAggregateInputObjectSchema.optional(),
    _max: RecipeMaxAggregateInputObjectSchema.optional(),
    _avg: RecipeAvgAggregateInputObjectSchema.optional(),
    _sum: RecipeSumAggregateInputObjectSchema.optional(),
  })
  .strict();
