import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';
import { RecipeIngredientOrderByWithAggregationInputObjectSchema as RecipeIngredientOrderByWithAggregationInputObjectSchema } from './objects/RecipeIngredientOrderByWithAggregationInput.schema';
import { RecipeIngredientScalarWhereWithAggregatesInputObjectSchema as RecipeIngredientScalarWhereWithAggregatesInputObjectSchema } from './objects/RecipeIngredientScalarWhereWithAggregatesInput.schema';
import { RecipeIngredientScalarFieldEnumSchema } from './enums/RecipeIngredientScalarFieldEnum.schema';
import { RecipeIngredientCountAggregateInputObjectSchema as RecipeIngredientCountAggregateInputObjectSchema } from './objects/RecipeIngredientCountAggregateInput.schema';
import { RecipeIngredientMinAggregateInputObjectSchema as RecipeIngredientMinAggregateInputObjectSchema } from './objects/RecipeIngredientMinAggregateInput.schema';
import { RecipeIngredientMaxAggregateInputObjectSchema as RecipeIngredientMaxAggregateInputObjectSchema } from './objects/RecipeIngredientMaxAggregateInput.schema';
import { RecipeIngredientAvgAggregateInputObjectSchema as RecipeIngredientAvgAggregateInputObjectSchema } from './objects/RecipeIngredientAvgAggregateInput.schema';
import { RecipeIngredientSumAggregateInputObjectSchema as RecipeIngredientSumAggregateInputObjectSchema } from './objects/RecipeIngredientSumAggregateInput.schema';

export const RecipeIngredientGroupBySchema: z.ZodType<Prisma.RecipeIngredientGroupByArgs> =
  z
    .object({
      where: RecipeIngredientWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          RecipeIngredientOrderByWithAggregationInputObjectSchema,
          RecipeIngredientOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        RecipeIngredientScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(RecipeIngredientScalarFieldEnumSchema),
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
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientGroupByArgs>;

export const RecipeIngredientGroupByZodSchema = z
  .object({
    where: RecipeIngredientWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeIngredientOrderByWithAggregationInputObjectSchema,
        RecipeIngredientOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      RecipeIngredientScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeIngredientScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RecipeIngredientCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeIngredientMinAggregateInputObjectSchema.optional(),
    _max: RecipeIngredientMaxAggregateInputObjectSchema.optional(),
    _avg: RecipeIngredientAvgAggregateInputObjectSchema.optional(),
    _sum: RecipeIngredientSumAggregateInputObjectSchema.optional(),
  })
  .strict();
