import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaOrderByWithRelationInputObjectSchema as MealAreaOrderByWithRelationInputObjectSchema } from './objects/MealAreaOrderByWithRelationInput.schema';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';
import { MealAreaWhereUniqueInputObjectSchema as MealAreaWhereUniqueInputObjectSchema } from './objects/MealAreaWhereUniqueInput.schema';
import { MealAreaCountAggregateInputObjectSchema as MealAreaCountAggregateInputObjectSchema } from './objects/MealAreaCountAggregateInput.schema';

export const MealAreaCountSchema: z.ZodType<Prisma.MealAreaCountArgs> = z
  .object({
    orderBy: z
      .union([
        MealAreaOrderByWithRelationInputObjectSchema,
        MealAreaOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealAreaWhereInputObjectSchema.optional(),
    cursor: MealAreaWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), MealAreaCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaCountArgs>;

export const MealAreaCountZodSchema = z
  .object({
    orderBy: z
      .union([
        MealAreaOrderByWithRelationInputObjectSchema,
        MealAreaOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: MealAreaWhereInputObjectSchema.optional(),
    cursor: MealAreaWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z
      .union([z.literal(true), MealAreaCountAggregateInputObjectSchema])
      .optional(),
  })
  .strict();
