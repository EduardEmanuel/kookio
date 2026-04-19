import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserProfileCountOutputTypeSelectObjectSchema as UserProfileCountOutputTypeSelectObjectSchema } from './UserProfileCountOutputTypeSelect.schema';

const makeSchema = () =>
  z
    .object({
      select: z
        .lazy(() => UserProfileCountOutputTypeSelectObjectSchema)
        .optional(),
    })
    .strict();
export const UserProfileCountOutputTypeArgsObjectSchema = makeSchema();
export const UserProfileCountOutputTypeArgsObjectZodSchema = makeSchema();
