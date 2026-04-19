import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialOrderByWithRelationInputObjectSchema as WebAuthnCredentialOrderByWithRelationInputObjectSchema } from './objects/WebAuthnCredentialOrderByWithRelationInput.schema';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialCountAggregateInputObjectSchema as WebAuthnCredentialCountAggregateInputObjectSchema } from './objects/WebAuthnCredentialCountAggregateInput.schema';
import { WebAuthnCredentialMinAggregateInputObjectSchema as WebAuthnCredentialMinAggregateInputObjectSchema } from './objects/WebAuthnCredentialMinAggregateInput.schema';
import { WebAuthnCredentialMaxAggregateInputObjectSchema as WebAuthnCredentialMaxAggregateInputObjectSchema } from './objects/WebAuthnCredentialMaxAggregateInput.schema';
import { WebAuthnCredentialAvgAggregateInputObjectSchema as WebAuthnCredentialAvgAggregateInputObjectSchema } from './objects/WebAuthnCredentialAvgAggregateInput.schema';
import { WebAuthnCredentialSumAggregateInputObjectSchema as WebAuthnCredentialSumAggregateInputObjectSchema } from './objects/WebAuthnCredentialSumAggregateInput.schema';

export const WebAuthnCredentialAggregateSchema: z.ZodType<Prisma.WebAuthnCredentialAggregateArgs> =
  z
    .object({
      orderBy: z
        .union([
          WebAuthnCredentialOrderByWithRelationInputObjectSchema,
          WebAuthnCredentialOrderByWithRelationInputObjectSchema.array(),
        ])
        .optional(),
      where: WebAuthnCredentialWhereInputObjectSchema.optional(),
      cursor: WebAuthnCredentialWhereUniqueInputObjectSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
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
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialAggregateArgs>;

export const WebAuthnCredentialAggregateZodSchema = z
  .object({
    orderBy: z
      .union([
        WebAuthnCredentialOrderByWithRelationInputObjectSchema,
        WebAuthnCredentialOrderByWithRelationInputObjectSchema.array(),
      ])
      .optional(),
    where: WebAuthnCredentialWhereInputObjectSchema.optional(),
    cursor: WebAuthnCredentialWhereUniqueInputObjectSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
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
