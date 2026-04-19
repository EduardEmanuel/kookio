import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagOrderByWithRelationInputObjectSchema as RecipeTagOrderByWithRelationInputObjectSchema } from './objects/RecipeTagOrderByWithRelationInput.schema';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';
import { RecipeTagWhereUniqueInputObjectSchema as RecipeTagWhereUniqueInputObjectSchema } from './objects/RecipeTagWhereUniqueInput.schema';
import { RecipeTagCountAggregateInputObjectSchema as RecipeTagCountAggregateInputObjectSchema } from './objects/RecipeTagCountAggregateInput.schema';

export const RecipeTagCountSchema: z.ZodType<Prisma.RecipeTagCountArgs> = z
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
    select: z
      .union([z.literal(true), RecipeTagCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeTagCountArgs>;

export const RecipeTagCountZodSchema = z
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
    select: z
      .union([z.literal(true), RecipeTagCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
