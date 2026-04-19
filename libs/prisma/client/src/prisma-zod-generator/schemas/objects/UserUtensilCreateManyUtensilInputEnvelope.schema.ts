import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateManyUtensilInputObjectSchema as UserUtensilCreateManyUtensilInputObjectSchema } from './UserUtensilCreateManyUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      data: z.union([
        z.lazy(() => UserUtensilCreateManyUtensilInputObjectSchema),
        z.lazy(() => UserUtensilCreateManyUtensilInputObjectSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();
export const UserUtensilCreateManyUtensilInputEnvelopeObjectSchema: z.ZodType<Prisma.UserUtensilCreateManyUtensilInputEnvelope> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilCreateManyUtensilInputEnvelope>;
export const UserUtensilCreateManyUtensilInputEnvelopeObjectZodSchema =
  makeSchema();
