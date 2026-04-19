import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealCategoryOrderByWithRelationInputObjectSchema as MealCategoryOrderByWithRelationInputObjectSchema } from './objects/MealCategoryOrderByWithRelationInput.schema';
import { MealCategoryWhereInputObjectSchema as MealCategoryWhereInputObjectSchema } from './objects/MealCategoryWhereInput.schema';
import { MealCategoryWhereUniqueInputObjectSchema as MealCategoryWhereUniqueInputObjectSchema } from './objects/MealCategoryWhereUniqueInput.schema';
import { MealCategoryCountAggregateInputObjectSchema as MealCategoryCountAggregateInputObjectSchema } from './objects/MealCategoryCountAggregateInput.schema';

export const MealCategoryCountSchema: z.ZodType<Prisma.MealCategoryCountArgs> =
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
      select: z
        .union([z.literal(true), MealCategoryCountAggregateInputObjectSchema])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.MealCategoryCountArgs>;

export const MealCategoryCountZodSchema = z
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
    select: z
      .union([z.literal(true), MealCategoryCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
