import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebAuthnCredentialScalarWhereInputObjectSchema as WebAuthnCredentialScalarWhereInputObjectSchema } from './WebAuthnCredentialScalarWhereInput.schema';
import { WebAuthnCredentialUpdateManyMutationInputObjectSchema as WebAuthnCredentialUpdateManyMutationInputObjectSchema } from './WebAuthnCredentialUpdateManyMutationInput.schema';
import { WebAuthnCredentialUncheckedUpdateManyWithoutUserInputObjectSchema as WebAuthnCredentialUncheckedUpdateManyWithoutUserInputObjectSchema } from './WebAuthnCredentialUncheckedUpdateManyWithoutUserInput.schema';

const makeSchema = () =>
  z
    .object({
      where: z.lazy(() => WebAuthnCredentialScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => WebAuthnCredentialUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            WebAuthnCredentialUncheckedUpdateManyWithoutUserInputObjectSchema,
        ),
      ]),
    })
    .strict();
export const WebAuthnCredentialUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.WebAuthnCredentialUpdateManyWithWhereWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.WebAuthnCredentialUpdateManyWithWhereWithoutUserInput>;
export const WebAuthnCredentialUpdateManyWithWhereWithoutUserInputObjectZodSchema =
  makeSchema();
