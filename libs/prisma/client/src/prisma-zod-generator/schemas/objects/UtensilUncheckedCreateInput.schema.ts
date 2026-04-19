import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilUncheckedCreateNestedManyWithoutUtensilInputObjectSchema as UserUtensilUncheckedCreateNestedManyWithoutUtensilInputObjectSchema } from './UserUtensilUncheckedCreateNestedManyWithoutUtensilInput.schema';

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      slug: z.string(),
      name: z.string(),
      emoji: z.string().optional().nullable(),
      category: z.string().optional().nullable(),
      users: z.lazy(
        () =>
          UserUtensilUncheckedCreateNestedManyWithoutUtensilInputObjectSchema,
      ),
    })
    .strict();
export const UtensilUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UtensilUncheckedCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.UtensilUncheckedCreateInput>;
export const UtensilUncheckedCreateInputObjectZodSchema = makeSchema();
