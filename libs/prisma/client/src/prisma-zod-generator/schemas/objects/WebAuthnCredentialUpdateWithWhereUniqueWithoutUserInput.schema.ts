import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialWhereUniqueInputObjectSchema as WebAuthnCredentialWhereUniqueInputObjectSchema } from './WebAuthnCredentialWhereUniqueInput.schema';
import { WebAuthnCredentialUpdateWithoutUserInputObjectSchema as WebAuthnCredentialUpdateWithoutUserInputObjectSchema } from './WebAuthnCredentialUpdateWithoutUserInput.schema';
import { WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedUpdateWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => WebAuthnCredentialWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => WebAuthnCredentialUpdateWithoutUserInputObjectSchema),
        z.lazy(
          () => WebAuthnCredentialUncheckedUpdateWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInput>;
export const WebAuthnCredentialUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
  makeSchema();
