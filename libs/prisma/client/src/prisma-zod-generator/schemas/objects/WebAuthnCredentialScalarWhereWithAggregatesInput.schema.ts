import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BytesWithAggregatesFilterObjectSchema as BytesWithAggregatesFilterObjectSchema } from './BytesWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { UuidNullableWithAggregatesFilterObjectSchema as UuidNullableWithAggregatesFilterObjectSchema } from './UuidNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

const webauthncredentialscalarwherewithaggregatesinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(
          () => WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    OR: z
      .lazy(() => WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(
          () => WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema,
        ),
        z
          .lazy(
            () => WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
      .optional(),
    credentialId: z
      .union([
        z.lazy(() => BytesWithAggregatesFilterObjectSchema),
        z.instanceof(Uint8Array),
      ])
      .optional(),
    publicKey: z
      .union([
        z.lazy(() => BytesWithAggregatesFilterObjectSchema),
        z.instanceof(Uint8Array),
      ])
      .optional(),
    counter: z
      .union([
        z.lazy(() => IntWithAggregatesFilterObjectSchema),
        z.number().int(),
      ])
      .optional(),
    transports: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    aaguid: z
      .union([
        z.lazy(() => UuidNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    attestationFmt: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    backupEligible: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    backupState: z
      .union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
      .optional(),
    deviceType: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    lastUsedAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    meta: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional(),
  })
  .strict();
export const WebAuthnCredentialScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialScalarWhereWithAggregatesInput> =
  webauthncredentialscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.WebAuthnCredentialScalarWhereWithAggregatesInput>;
export const WebAuthnCredentialScalarWhereWithAggregatesInputObjectZodSchema =
  webauthncredentialscalarwherewithaggregatesinputSchema;
