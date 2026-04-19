import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebAuthnCredentialIncludeObjectSchema as WebAuthnCredentialIncludeObjectSchema } from './objects/WebAuthnCredentialInclude.schema';
import { WebAuthnCredentialOrderByWithRelationInputObjectSchema as WebAuthnCredentialOrderByWithRelationInputObjectSchema } from './objects/WebAuthnCredentialOrderByWithRelationInput.schema';
import { WebAuthnCredentialWhereInputObjectSchema as WebAuthnCredentialWhereInputObjectSchema } from './objects/WebAuthnCredentialWhereInput.schema';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './objects/WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialScalarFieldEnumSchema } from './enums/WebAuthnCredentialScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WebAuthnCredentialFindFirstSelectSchema: z.ZodType<Prisma.WebAuthnCredentialSelect> =
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      credentialId: z.boolean().optional(),
      publicKey: z.boolean().optional(),
      counter: z.boolean().optional(),
      transports: z.boolean().optional(),
      aaguid: z.boolean().optional(),
      attestationFmt: z.boolean().optional(),
      backupEligible: z.boolean().optional(),
      backupState: z.boolean().optional(),
      deviceType: z.boolean().optional(),
      lastUsedAt: z.boolean().optional(),
      meta: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      user: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialSelect>;

export const WebAuthnCredentialFindFirstSelectZodSchema = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    credentialId: z.boolean().optional(),
    publicKey: z.boolean().optional(),
    counter: z.boolean().optional(),
    transports: z.boolean().optional(),
    aaguid: z.boolean().optional(),
    attestationFmt: z.boolean().optional(),
    backupEligible: z.boolean().optional(),
    backupState: z.boolean().optional(),
    deviceType: z.boolean().optional(),
    lastUsedAt: z.boolean().optional(),
    meta: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
  })
  .strict();

export const WebAuthnCredentialFindFirstSchema: z.ZodType<Prisma.WebAuthnCredentialFindFirstArgs> =
  z
    .object({
      select: WebAuthnCredentialFindFirstSelectSchema.optional(),
      include: WebAuthnCredentialIncludeObjectSchema.optional(),
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
      distinct: z
        .union([
          WebAuthnCredentialScalarFieldEnumSchema,
          WebAuthnCredentialScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.WebAuthnCredentialFindFirstArgs>;

export const WebAuthnCredentialFindFirstZodSchema = z
  .object({
    select: WebAuthnCredentialFindFirstSelectSchema.optional(),
    include: WebAuthnCredentialIncludeObjectSchema.optional(),
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
    distinct: z
      .union([
        WebAuthnCredentialScalarFieldEnumSchema,
        WebAuthnCredentialScalarFieldEnumSchema.array(),
      ])
      .optional(),
  })
  .strict();
