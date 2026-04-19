import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialUpdateWithoutUserInputObjectSchema as WebAuthnCredentialUpdateWithoutUserInputObjectSchema } from './WebAuthnCredentialUpdateWithoutUserInput.schema';
import { WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedUpdateWithoutUserInput.schema';
import { WebAuthnCredentialCreateWithoutUserInputObjectSchema as WebAuthnCredentialCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialCreateWithoutUserInput.schema';
import { WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedCreateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => WebAuthnCredentialUpdateWithoutUserInputObjectSchema),
        z.lazy(
          () => WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => WebAuthnCredentialCreateWithoutUserInputObjectSchema),
        z.lazy(
          () => WebAuthnCredentialUncheckedCreateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInput>;
export const WebAuthnCredentialUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
