import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RecipeCollectionEntryOrderByWithRelationInputObjectSchema as RecipeCollectionEntryOrderByWithRelationInputObjectSchema } from './objects/RecipeCollectionEntryOrderByWithRelationInput.schema';
import { RecipeCollectionEntryWhereInputObjectSchema as RecipeCollectionEntryWhereInputObjectSchema } from './objects/RecipeCollectionEntryWhereInput.schema';
import { RecipeCollectionEntryWhereUniqueInputObjectSchema as RecipeCollectionEntryWhereUniqueInputObjectSchema } from './objects/RecipeCollectionEntryWhereUniqueInput.schema';
import { RecipeCollectionEntryCountAggregateInputObjectSchema as RecipeCollectionEntryCountAggregateInputObjectSchema } from './objects/RecipeCollectionEntryCountAggregateInput.schema';

export const RecipeCollectionEntryCountSchema: z.ZodType<Prisma.RecipeCollectionEntryCountArgs> =
  z
    .object({
      orderBy: z
        .union([
          RecipeCollectionEntryOrderByWithRelationInputObjectSchema,
          RecipeCollectionEntryOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
      cursor: RecipeCollectionEntryWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      select: z
        .union([
          z.literal(true),
          RecipeCollectionEntryCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.RecipeCollectionEntryCountArgs>;

export const RecipeCollectionEntryCountZodSchema = z
  .object({
    orderBy: z
      .union([
        RecipeCollectionEntryOrderByWithRelationInputObjectSchema,
        RecipeCollectionEntryOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: RecipeCollectionEntryWhereInputObjectSchema.optional(),
    cursor: RecipeCollectionEntryWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([
        z.literal(true),
        RecipeCollectionEntryCountAggregateInputObjectSchema,
      ])
      .optional(),
  })
  .strict();
