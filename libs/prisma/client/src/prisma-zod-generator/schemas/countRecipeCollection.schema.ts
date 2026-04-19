import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionOrderByWithRelationInputObjectSchema as RecipeCollectionOrderByWithRelationInputObjectSchema } from './objects/RecipeCollectionOrderByWithRelationInput.schema';
import { RecipeCollectionWhereInputObjectSchema as RecipeCollectionWhereInputObjectSchema } from './objects/RecipeCollectionWhereInput.schema';
import { RecipeCollectionWhereUniqueInputObjectSchema as RecipeCollectionWhereUniqueInputObjectSchema } from './objects/RecipeCollectionWhereUniqueInput.schema';
import { RecipeCollectionCountAggregateInputObjectSchema as RecipeCollectionCountAggregateInputObjectSchema } from './objects/RecipeCollectionCountAggregateInput.schema';

export const RecipeCollectionCountSchema: z.ZodType<Prisma.RecipeCollectionCountArgs> =
  z
    .object({
      orderBy: z
        .union([
          RecipeCollectionOrderByWithRelationInputObjectSchema,
          RecipeCollectionOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeCollectionWhereInputObjectSchema.optional(),
      cursor: RecipeCollectionWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      select: z
        .union([
          z.literal(true),
          RecipeCollectionCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionCountArgs>;

export const RecipeCollectionCountZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeCollectionOrderByWithRelationInputObjectSchema,
        RecipeCollectionOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeCollectionWhereInputObjectSchema.optional(),
    cursor: RecipeCollectionWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), RecipeCollectionCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
