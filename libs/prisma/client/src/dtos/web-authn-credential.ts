import z from 'zod';
import {
  WebAuthnCredentialCountResultSchema,
  WebAuthnCredentialCountSchema,
  WebAuthnCredentialCreateManyResultSchema,
  WebAuthnCredentialCreateManySchema,
  WebAuthnCredentialCreateOneSchema,
  WebAuthnCredentialCreateResultSchema,
  WebAuthnCredentialDeleteManyResultSchema,
  WebAuthnCredentialDeleteManySchema,
  WebAuthnCredentialDeleteOneSchema,
  WebAuthnCredentialDeleteResultSchema,
  WebAuthnCredentialFindManyResultSchema,
  WebAuthnCredentialFindManySchema,
  WebAuthnCredentialFindUniqueResultSchema,
  WebAuthnCredentialFindUniqueSchema,
  WebAuthnCredentialGroupByResultSchema,
  WebAuthnCredentialGroupBySchema,
  WebAuthnCredentialUpdateManyResultSchema,
  WebAuthnCredentialUpdateManySchema,
  WebAuthnCredentialUpdateOneSchema,
  WebAuthnCredentialUpdateResultSchema,
  WebAuthnCredentialUpsertOneSchema,
  WebAuthnCredentialUpsertResultSchema,
} from '../prisma-zod-generator/index';

export type CountWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialCountSchema
>;
export type CountWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialCountResultSchema
>;
export type CreateOneWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialCreateOneSchema
>;
export type CreateWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialCreateResultSchema
>;
export type CreateManyWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialCreateManySchema
>;
export type CreateManyWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialCreateManyResultSchema
>;
export type DeleteOneWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialDeleteOneSchema
>;
export type DeleteWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialDeleteResultSchema
>;
export type DeleteManyWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialDeleteManySchema
>;
export type DeleteManyWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialDeleteManyResultSchema
>;
export type FindManyWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialFindManySchema
>;
export type FindManyWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialFindManyResultSchema
>;
export type FindUniqueWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialFindUniqueSchema
>;
export type FindUniqueWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialFindUniqueResultSchema
>;
export type GroupByWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialGroupBySchema
>;
export type GroupByWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialGroupByResultSchema
>;
export type UpdateOneWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialUpdateOneSchema
>;
export type UpdateWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialUpdateResultSchema
>;
export type UpdateManyWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialUpdateManySchema
>;
export type UpdateManyWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialUpdateManyResultSchema
>;
export type UpsertOneWebAuthnCredentialDTO = z.output<
  typeof WebAuthnCredentialUpsertOneSchema
>;
export type UpsertWebAuthnCredentialResultDTO = z.output<
  typeof WebAuthnCredentialUpsertResultSchema
>;
