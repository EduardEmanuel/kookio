import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilCreateNestedManyWithoutUtensilInputObjectSchema as UserUtensilCreateNestedManyWithoutUtensilInputObjectSchema } from './UserUtensilCreateNestedManyWithoutUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      slug: z.string(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      category: z.string().optional().nullable(),
      users: z.lazy(
        () => UserUtensilCreateNestedManyWithoutUtensilInputObjectSchema,
      ),
    })
    .strict();
export const UtensilCreateInputObjectSchema: z.ZodType<Prisma.UtensilCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilCreateInput>;
export const UtensilCreateInputObjectZodSchema = makeSchema();
