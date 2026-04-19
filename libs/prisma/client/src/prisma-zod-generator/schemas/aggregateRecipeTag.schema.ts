import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagOrderByWithRelationInputObjectSchema as RecipeTagOrderByWithRelationInputObjectSchema } from './objects/RecipeTagOrderByWithRelationInput.schema';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './objects/RecipeTagWhereUniqueInput.schema';
import { RecipeTagCountAggregateInputObjectSchema as RecipeTagCountAggregateInputObjectSchema } from './objects/RecipeTagCountAggregateInput.schema';
import { RecipeTagMinAggregateInputObjectSchema as RecipeTagMinAggregateInputObjectSchema } from './objects/RecipeTagMinAggregateInput.schema';
import { RecipeTagMaxAggregateInputObjectSchema as RecipeTagMaxAggregateInputObjectSchema } from './objects/RecipeTagMaxAggregateInput.schema';

export const RecipeTagAggregateSchema: z.ZodType<Prisma.RecipeTagAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          RecipeTagOrderByWithRelationInputObjectSchema,
          RecipeTagOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeTagWhereInputObjectSchema.optional(),
      cursor: RecipeTagWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), RecipeTagCountAggregateInputObjectSchema])
        .optional(),
      _min: RecipeTagMinAggregateInputObjectSchema.optional(),
      _max: RecipeTagMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeTagAggregateArgs>;

export const RecipeTagAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeTagOrderByWithRelationInputObjectSchema,
        RecipeTagOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeTagWhereInputObjectSchema.optional(),
    cursor: RecipeTagWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), RecipeTagCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeTagMinAggregateInputObjectSchema.optional(),
    _max: RecipeTagMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
