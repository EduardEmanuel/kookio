import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileArgsObjectSchema as UserProfileArgsObjectSchema } from './UserProfileArgs.schema';
import { UtensilArgsObjectSchema as UtensilArgsObjectSchema } from './UtensilArgs.schema';

const makeSchema = () =>
  z
    .object({
      userId: z.boolean().optional(),
      utensilId: z.boolean().optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserProfileArgsObjectSchema)])
        .optional(),
      utensil: z
        .union([z.boolean(), z.lazy(() => UtensilArgsObjectSchema)])
        .optional(),
    })
    .strict();
export const UserUtensilSelectObjectSchema: z.ZodType<Prisma.UserUtensilSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.UserUtensilSelect>;
export const UserUtensilSelectObjectZodSchema = makeSchema();
