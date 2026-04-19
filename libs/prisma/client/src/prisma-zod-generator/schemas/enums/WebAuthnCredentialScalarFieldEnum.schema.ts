import * as z from 'zod';

export const WebAuthnCredentialScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'credentialId',
  'publicKey',
  'counter',
  'transports',
  'aaguid',
  'attestationFmt',
  'backupEligible',
  'backupState',
  'deviceType',
  'lastUsedAt',
  'meta',
  'createdAt',
  'updatedAt',
]);

export type WebAuthnCredentialScalarFieldEnum = z.infer<
  typeof WebAuthnCredentialScalarFieldEnumSchema
>;
