import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeTagWhereInputObjectSchema as RecipeTagWhereInputObjectSchema } from './objects/RecipeTagWhereInput.schema';
import { RecipeTagOrderByWithAggregationInputObjectSchema as RecipeTagOrderByWithAggregationInputObjectSchema } from './objects/RecipeTagOrderByWithAggregationInput.schema';
import { RecipeTagScalarWhereWithAggregatesInputObjectSchema as RecipeTagScalarWhereWithAggregatesInputObjectSchema } from './objects/RecipeTagScalarWhereWithAggregatesInput.schema';
import { RecipeTagScalarFieldEnumSchema } from './enums/RecipeTagScalarFieldEnum.schema';
import { RecipeTagCountAggregateInputObjectSchema as RecipeTagCountAggregateInputObjectSchema } from './objects/RecipeTagCountAggregateInput.schema';
import { RecipeTagMinAggregateInputObjectSchema as RecipeTagMinAggregateInputObjectSchema } from './objects/RecipeTagMinAggregateInput.schema';
import { RecipeTagMaxAggregateInputObjectSchema as RecipeTagMaxAggregateInputObjectSchema } from './objects/RecipeTagMaxAggregateInput.schema';

export const RecipeTagGroupBySchema: z.ZodType<Prisma.RecipeTagGroupByArgs> = z
  .object({
    where: RecipeTagWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeTagOrderByWithAggregationInputObjectSchema,
        RecipeTagOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: RecipeTagScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeTagScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RecipeTagCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeTagMinAggregateInputObjectSchema.optional(),
    _max: RecipeTagMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.RecipeTagGroupByArgs>;

export const RecipeTagGroupByZodSchema = z
  .object({
    where: RecipeTagWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        RecipeTagOrderByWithAggregationInputObjectSchema,
        RecipeTagOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: RecipeTagScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(RecipeTagScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), RecipeTagCountAggregateInputObjectSchema])
      .optional(),
    _min: RecipeTagMinAggregateInputObjectSchema.optional(),
    _max: RecipeTagMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
