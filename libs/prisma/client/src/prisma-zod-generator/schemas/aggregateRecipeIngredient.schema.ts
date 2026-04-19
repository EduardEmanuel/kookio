import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientOrderByWithRelationInputObjectSchema as RecipeIngredientOrderByWithRelationInputObjectSchema } from './objects/RecipeIngredientOrderByWithRelationInput.schema';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './objects/RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientCountAggregateInputObjectSchema as RecipeIngredientCountAggregateInputObjectSchema } from './objects/RecipeIngredientCountAggregateInput.schema';
import { RecipeIngredientMinAggregateInputObjectSchema as RecipeIngredientMinAggregateInputObjectSchema } from './objects/RecipeIngredientMinAggregateInput.schema';
import { RecipeIngredientMaxAggregateInputObjectSchema as RecipeIngredientMaxAggregateInputObjectSchema } from './objects/RecipeIngredientMaxAggregateInput.schema';
import { RecipeIngredientAvgAggregateInputObjectSchema as RecipeIngredientAvgAggregateInputObjectSchema } from './objects/RecipeIngredientAvgAggregateInput.schema';
import { RecipeIngredientSumAggregateInputObjectSchema as RecipeIngredientSumAggregateInputObjectSchema } from './objects/RecipeIngredientSumAggregateInput.schema';

export const RecipeIngredientAggregateSchema: z.ZodType<Prisma.RecipeIngredientAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          RecipeIngredientOrderByWithRelationInputObjectSchema,
          RecipeIngredientOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeIngredientWhereInputObjectSchema.optional(),
      cursor: RecipeIngredientWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([
          z.literal(true),
          RecipeIngredientCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: RecipeIngredientMinAggregateInputObjectSchema.optional(),
      _max: RecipeIngredientMaxAggregateInputObjectSchema.optional(),
      _avg: RecipeIngredientAvgAggregateInputObjectSchema.optional(),
      _sum: RecipeIngredientSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientAggregateArgs>;

export const RecipeIngredientAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeIngredientOrderByWithRelationInputObjectSchema,
        RecipeIngredientOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeIngredientWhereInputObjectSchema.optional(),
    cursor: RecipeIngredientWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), RecipeIngredientCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeIngredientMinAggregateInputObjectSchema.optional(),
    _max: RecipeIngredientMaxAggregateInputObjectSchema.optional(),
    _avg: RecipeIngredientAvgAggregateInputObjectSchema.optional(),
    _sum: RecipeIngredientSumAggregateInputObjectSchema.optional(),
  })
  .strict();
