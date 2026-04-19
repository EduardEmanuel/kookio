import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MealAreaWhereInputObjectSchema as MealAreaWhereInputObjectSchema } from './objects/MealAreaWhereInput.schema';
import { MealAreaOrderByWithAggregationInputObjectSchema as MealAreaOrderByWithAggregationInputObjectSchema } from './objects/MealAreaOrderByWithAggregationInput.schema';
import { MealAreaScalarWhereWithAggregatesInputObjectSchema as MealAreaScalarWhereWithAggregatesInputObjectSchema } from './objects/MealAreaScalarWhereWithAggregatesInput.schema';
import { MealAreaScalarFieldEnumSchema } from './enums/MealAreaScalarFieldEnum.schema';
import { MealAreaCountAggregateInputObjectSchema as MealAreaCountAggregateInputObjectSchema } from './objects/MealAreaCountAggregateInput.schema';
import { MealAreaMinAggregateInputObjectSchema as MealAreaMinAggregateInputObjectSchema } from './objects/MealAreaMinAggregateInput.schema';
import { MealAreaMaxAggregateInputObjectSchema as MealAreaMaxAggregateInputObjectSchema } from './objects/MealAreaMaxAggregateInput.schema';

export const MealAreaGroupBySchema: z.ZodType<Prisma.MealAreaGroupByArgs> = z
  .object({
    where: MealAreaWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        MealAreaOrderByWithAggregationInputObjectSchema,
        MealAreaOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: MealAreaScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(MealAreaScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), MealAreaCountAggregateInputObjectSchema])
      .optional(),
    _min: MealAreaMinAggregateInputObjectSchema.optional(),
    _max: MealAreaMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.MealAreaGroupByArgs>;

export const MealAreaGroupByZodSchema = z
  .object({
    where: MealAreaWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        MealAreaOrderByWithAggregationInputObjectSchema,
        MealAreaOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: MealAreaScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(MealAreaScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), MealAreaCountAggregateInputObjectSchema])
      .optional(),
    _min: MealAreaMinAggregateInputObjectSchema.optional(),
    _max: MealAreaMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
