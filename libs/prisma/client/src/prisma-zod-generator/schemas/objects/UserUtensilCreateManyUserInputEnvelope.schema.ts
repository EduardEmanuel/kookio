import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateManyUserInputObjectSchema as UserUtensilCreateManyUserInputObjectSchema } from './UserUtensilCreateManyUserInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => UserUtensilCreateManyUserInputObjectSchema),
        z.lazy(() => UserUtensilCreateManyUserInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const UserUtensilCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.UserUtensilCreateManyUserInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateManyUserInputEnvelope>;
export const UserUtensilCreateManyUserInputEnvelopeObjectZodSchema =
  makeSchema();
