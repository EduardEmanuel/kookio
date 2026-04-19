import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryOrderByWithRelationInputObjectSchema as MealCategoryOrderByWithRelationInputObjectSchema } from './objects/MealCategoryOrderByWithRelationInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';
import { MealCategoryCountAggregateInputObjectSchema as MealCategoryCountAggregateInputObjectSchema } from './objects/MealCategoryCountAggregateInput.schema';
import { MealCategoryMinAggregateInputObjectSchema as MealCategoryMinAggregateInputObjectSchema } from './objects/MealCategoryMinAggregateInput.schema';
import { MealCategoryMaxAggregateInputObjectSchema as MealCategoryMaxAggregateInputObjectSchema } from './objects/MealCategoryMaxAggregateInput.schema';

export const MealCategoryAggregateSchema: z.ZodType<Prisma.MealCategoryAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          MealCategoryOrderByWithRelationInputObjectSchema,
          MealCategoryOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: MealCategoryWhereInputObjectSchema.optional(),
      cursor: MealCategoryWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      _count: z
        .union([z.literal(true), MealCategoryCountAggregateInputObjectSchema])
        .optional(),
      _min: MealCategoryMinAggregateInputObjectSchema.optional(),
      _max: MealCategoryMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryAggregateArgs>;

export const MealCategoryAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        MealCategoryOrderByWithRelationInputObjectSchema,
        MealCategoryOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealCategoryWhereInputObjectSchema.optional(),
    cursor: MealCategoryWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    _count: z
      .union([z.literal(true), MealCategoryCountAggregateInputObjectSchema])
      .optional(),
    _min: MealCategoryMinAggregateInputObjectSchema.optional(),
    _max: MealCategoryMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
