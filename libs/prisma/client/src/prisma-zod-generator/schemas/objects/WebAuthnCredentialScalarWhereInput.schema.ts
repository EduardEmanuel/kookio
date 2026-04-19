import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BytesFilterObjectSchema as BytesFilterObjectSchema } from './BytesFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { UuidNullableFilterObjectSchema as UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

const webauthncredentialscalarwhereinputSchema = z
  .object({
    AND: z
      .union([
        z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema),
        z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema),
        z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    credentialId: z
      .union([z.lazy(() => BytesFilterObjectSchema), z.instanceof(Uint8Array)])
      .optional(),
    publicKey: z
      .union([z.lazy(() => BytesFilterObjectSchema), z.instanceof(Uint8Array)])
      .optional(),
    counter: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
      .optional(),
    transports: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    aaguid: z
      .union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    attestationFmt: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    backupEligible: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    backupState: z
      .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
      .optional(),
    deviceType: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    lastUsedAt: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    meta: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();
export const WebAuthnCredentialScalarWhereInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialScalarWhereInput> =
  webauthncredentialscalarwhereinputSchema as unknown as z.ZodType<Prisma.WebAuthnCredentialScalarWhereInput>;
export const WebAuthnCredentialScalarWhereInputObjectZodSchema =
  webauthncredentialscalarwhereinputSchema;
