import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialOrderByWithRelationInputObjectSchema as WebAuthnCredentialOrderByWithRelationInputObjectSchema } from './objects/WebAuthnCredentialOrderByWithRelationInput.schema';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialCountAggregateInputObjectSchema as WebAuthnCredentialCountAggregateInputObjectSchema } from './objects/WebAuthnCredentialCountAggregateInput.schema';

export const WebAuthnCredentialCountSchema: z.ZodType<Prisma.WebAuthnCredentialCountArgs> =
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
      select: z
        .union([
          z.literal(true),
          WebAuthnCredentialCountAggregateInputObjectSchema,
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialCountArgs>;

export const WebAuthnCredentialCountZodSchema = z
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
    select: z
      .union([
        z.literal(true),
        WebAuthnCredentialCountAggregateInputObjectSchema,
      ])
      .optional(),
  })
  .strict();
