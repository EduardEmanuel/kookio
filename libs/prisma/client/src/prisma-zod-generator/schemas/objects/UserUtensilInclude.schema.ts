import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsObjectSchema as UserProfileArgsObjectSchema } from './UserProfileArgs.schema';
import { UtensilArgsObjectSchema as UtensilArgsObjectSchema } from './UtensilArgs.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserProfileArgsObjectSchema)])
        .optional(),
      utensil: z
        .union([z.boolean(), z.lazy(() => UtensilArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserUtensilIncludeObjectSchema: z.ZodType<Prisma.UserUtensilInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilInclude>;
export const UserUtensilIncludeObjectZodSchema = makeSchema();
