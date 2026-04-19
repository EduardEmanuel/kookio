import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CookingSessionSelectObjectSchema as CookingSessionSelectObjectSchema } from './CookingSessionSelect.schema';
import { CookingSessionIncludeObjectSchema as CookingSessionIncludeObjectSchema } from './CookingSessionInclude.schema';

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => CookingSessionSelectObjectSchema).optional(),
      include: z.lazy(() => CookingSessionIncludeObjectSchema).optional(),
    })
    .strict();
export const CookingSessionArgsObjectSchema = makeSchema();
export const CookingSessionArgsObjectZodSchema = makeSchema();
