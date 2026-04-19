import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';
import { WebAuthnCredentialOrderByWithAggregationInputObjectSchema as WebAuthnCredentialOrderByWithAggregationInputObjectSchema } from './objects/WebAuthnCredentialOrderByWithAggregationInput.schema';
import { WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema as WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema } from './objects/WebAuthnCredentialScalarWhereWithAggregatesInput.schema';
import { WebAuthnCredentialScalarFieldEnumSchema } from './enums/WebAuthnCredentialScalarFieldEnum.schema';
import { WebAuthnCredentialCountAggregateInputObjectSchema as WebAuthnCredentialCountAggregateInputObjectSchema } from './objects/WebAuthnCredentialCountAggregateInput.schema';
import { WebAuthnCredentialMinAggregateInputObjectSchema as WebAuthnCredentialMinAggregateInputObjectSchema } from './objects/WebAuthnCredentialMinAggregateInput.schema';
import { WebAuthnCredentialMaxAggregateInputObjectSchema as WebAuthnCredentialMaxAggregateInputObjectSchema } from './objects/WebAuthnCredentialMaxAggregateInput.schema';
import { WebAuthnCredentialAvgAggregateInputObjectSchema as WebAuthnCredentialAvgAggregateInputObjectSchema } from './objects/WebAuthnCredentialAvgAggregateInput.schema';
import { WebAuthnCredentialSumAggregateInputObjectSchema as WebAuthnCredentialSumAggregateInputObjectSchema } from './objects/WebAuthnCredentialSumAggregateInput.schema';

export const WebAuthnCredentialGroupBySchema: z.ZodType<Prisma.WebAuthnCredentialGroupByArgs> =
  z
    .object({
      where: WebAuthnCredentialWhereInputObjectSchema.optional(),
      orderBy: z
        .union([
          WebAuthnCredentialOrderByWithAggregationInputObjectSchema,
          WebAuthnCredentialOrderByWithAggregationInputObjectSchema.array(),
        ])
        .optional(),
      having:
        WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      by: z.array(WebAuthnCredentialScalarFieldEnumSchema),
      _count: z
        .union([
          z.literal(true),
          WebAuthnCredentialCountAggregateInputObjectSchema,
        ])
        .optional(),
      _min: WebAuthnCredentialMinAggregateInputObjectSchema.optional(),
      _max: WebAuthnCredentialMaxAggregateInputObjectSchema.optional(),
      _avg: WebAuthnCredentialAvgAggregateInputObjectSchema.optional(),
      _sum: WebAuthnCredentialSumAggregateInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialGroupByArgs>;

export const WebAuthnCredentialGroupByZodSchema = z
  .object({
    where: WebAuthnCredentialWhereInputObjectSchema.optional(),
    orderBy: z
      .union([
        WebAuthnCredentialOrderByWithAggregationInputObjectSchema,
        WebAuthnCredentialOrderByWithAggregationInputObjectSchema.array(),
      ])
      .optional(),
    having:
      WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    by: z.array(WebAuthnCredentialScalarFieldEnumSchema),
    _count: z
      .union([
        z.literal(true),
        WebAuthnCredentialCountAggregateInputObjectSchema,
      ])
      .optional(),
    _min: WebAuthnCredentialMinAggregateInputObjectSchema.optional(),
    _max: WebAuthnCredentialMaxAggregateInputObjectSchema.optional(),
    _avg: WebAuthnCredentialAvgAggregateInputObjectSchema.optional(),
    _sum: WebAuthnCredentialSumAggregateInputObjectSchema.optional(),
  })
  .strict();
