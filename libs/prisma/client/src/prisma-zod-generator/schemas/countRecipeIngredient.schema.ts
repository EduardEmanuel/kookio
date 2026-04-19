import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeIngredientOrderByWithRelationInputObjectSchema as RecipeIngredientOrderByWithRelationInputObjectSchema } from './objects/RecipeIngredientOrderByWithRelationInput.schema';
import { RecipeIngredientWhereInputObjectSchema as RecipeIngredientWhereInputObjectSchema } from './objects/RecipeIngredientWhereInput.schema';
import { RecipeIngredientWhereUniqueInputObjectSchema as RecipeIngredientWhereUniqueInputObjectSchema } from './objects/RecipeIngredientWhereUniqueInput.schema';
import { RecipeIngredientCountAggregateInputObjectSchema as RecipeIngredientCountAggregateInputObjectSchema } from './objects/RecipeIngredientCountAggregateInput.schema';

export const RecipeIngredientCountSchema: z.ZodType<Prisma.RecipeIngredientCountArgs> =
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
      select: z
        .union([
          z.literal(true),
          RecipeIngredientCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeIngredientCountArgs>;

export const RecipeIngredientCountZodSchema = z
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
    select: z
      .union([z.literal(true), RecipeIngredientCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
