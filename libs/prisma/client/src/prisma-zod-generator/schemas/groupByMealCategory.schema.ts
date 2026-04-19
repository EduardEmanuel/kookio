import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';
import { MealCategoryOrderByWithAggregationInputObjectSchema as MealCategoryOrderByWithAggregationInputObjectSchema } from './objects/MealCategoryOrderByWithAggregationInput.schema';
import { MealCategoryScalarWhereWithAggregatesInputObjectSchema as MealCategoryScalarWhereWithAggregatesInputObjectSchema } from './objects/MealCategoryScalarWhereWithAggregatesInput.schema';
import { MealCategoryScalarFieldEnumSchema } from './enums/MealCategoryScalarFieldEnum.schema';
import { MealCategoryCountAggregateInputObjectSchema as MealCategoryCountAggregateInputObjectSchema } from './objects/MealCategoryCountAggregateInput.schema';
import { MealCategoryMinAggregateInputObjectSchema as MealCategoryMinAggregateInputObjectSchema } from './objects/MealCategoryMinAggregateInput.schema';
import { MealCategoryMaxAggregateInputObjectSchema as MealCategoryMaxAggregateInputObjectSchema } from './objects/MealCategoryMaxAggregateInput.schema';

export const MealCategoryGroupBySchema: z.ZodType<Prisma.MealCategoryGroupByArgs> =
  z
    .object({
      where: MealCategoryWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          MealCategoryOrderByWithAggregationInputObjectSchema,
          MealCategoryOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having: MealCategoryScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(MealCategoryScalarFieldEnumSchema),
      _count: z
        .union([z.literal(true), MealCategoryCountAggregateInputObjectSchema])
        .optional(),
      _min: MealCategoryMinAggregateInputObjectSchema.optional(),
      _max: MealCategoryMaxAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryGroupByArgs>;

export const MealCategoryGroupByZodSchema = z
  .object({
    where: MealCategoryWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        MealCategoryOrderByWithAggregationInputObjectSchema,
        MealCategoryOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: MealCategoryScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(MealCategoryScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), MealCategoryCountAggregateInputObjectSchema])
      .optional(),
    _min: MealCategoryMinAggregateInputObjectSchema.optional(),
    _max: MealCategoryMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
