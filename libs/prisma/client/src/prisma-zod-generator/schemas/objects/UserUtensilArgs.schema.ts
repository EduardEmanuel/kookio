import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUtensilSelectObjectSchema as UserUtensilSelectObjectSchema } from './UserUtensilSelect.schema';
import { UserUtensilIncludeObjectSchema as UserUtensilIncludeObjectSchema } from './UserUtensilInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => UserUtensilSelectObjectSchema).optional(),
      include: z.lazy(() => UserUtensilIncludeObjectSchema).optional(),
    })
    .strict();
export const UserUtensilArgsObjectSchema = makeSchema();
export const UserUtensilArgsObjectZodSchema = makeSchema();
