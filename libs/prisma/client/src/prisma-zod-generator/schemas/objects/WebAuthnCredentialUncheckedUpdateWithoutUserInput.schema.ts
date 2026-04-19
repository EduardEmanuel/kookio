import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BytesFieldUpdateOperationsInputObjectSchema as BytesFieldUpdateOperationsInputObjectSchema } from './BytesFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { WebAuthnCredentialUpdatetransportsInputObjectSchema as WebAuthnCredentialUpdatetransportsInputObjectSchema } from './WebAuthnCredentialUpdatetransportsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () =>
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      credentialId: z
        .union([
          z.instanceof(Uint8Array),
          z.lazy(() => BytesFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      publicKey: z
        .union([
          z.instanceof(Uint8Array),
          z.lazy(() => BytesFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      counter: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      transports: z
        .union([
          z.lazy(() => WebAuthnCredentialUpdatetransportsInputObjectSchema),
          z.string().array(),
        ])
        .optional(),
      aaguid: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      attestationFmt: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      backupEligible: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      backupState: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      deviceType: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      lastUsedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional()
        .nullable(),
      meta: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUncheckedUpdateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUncheckedUpdateWithoutUserInput>;
export const WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectZodSchema =
  makeSchema();
