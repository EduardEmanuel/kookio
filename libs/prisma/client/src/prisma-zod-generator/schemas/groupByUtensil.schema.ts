import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UtensilWhereInputObjectSchema as UtensilWhereInputObjectSchema } from './objects/UtensilWhereInput.schema';
import { UtensilOrderByWithAggregationInputObjectSchema as UtensilOrderByWithAggregationInputObjectSchema } from './objects/UtensilOrderByWithAggregationInput.schema';
import { UtensilScalarWhereWithAggregatesInputObjectSchema as UtensilScalarWhereWithAggregatesInputObjectSchema } from './objects/UtensilScalarWhereWithAggregatesInput.schema';
import { UtensilScalarFieldEnumSchema } from './enums/UtensilScalarFieldEnum.schema';
import { UtensilCountAggregateInputObjectSchema as UtensilCountAggregateInputObjectSchema } from './objects/UtensilCountAggregateInput.schema';
import { UtensilMinAggregateInputObjectSchema as UtensilMinAggregateInputObjectSchema } from './objects/UtensilMinAggregateInput.schema';
import { UtensilMaxAggregateInputObjectSchema as UtensilMaxAggregateInputObjectSchema } from './objects/UtensilMaxAggregateInput.schema';

export const UtensilGroupBySchema: z.ZodType<Prisma.UtensilGroupByArgs> = z
  .object({
    where: UtensilWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UtensilOrderByWithAggregationInputObjectSchema,
        UtensilOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UtensilScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UtensilScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), UtensilCountAggregateInputObjectSchema])
      .optional(),
    _min: UtensilMinAggregateInputObjectSchema.optional(),
    _max: UtensilMaxAggregateInputObjectSchema.optional(),
  })
  .strict() as unknown as z.ZodType<Prisma.UtensilGroupByArgs>;

export const UtensilGroupByZodSchema = z
  .object({
    where: UtensilWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        UtensilOrderByWithAggregationInputObjectSchema,
        UtensilOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having: UtensilScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(UtensilScalarFieldEnumSchema),
    _count: z
      .union([z.literal(true), UtensilCountAggregateInputObjectSchema])
      .optional(),
    _min: UtensilMinAggregateInputObjectSchema.optional(),
    _max: UtensilMaxAggregateInputObjectSchema.optional(),
  })
  .strict();
