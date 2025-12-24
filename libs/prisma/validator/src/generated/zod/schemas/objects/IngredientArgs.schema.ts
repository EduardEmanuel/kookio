import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IngredientSelectObjectSchema as IngredientSelectObjectSchema } from './IngredientSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => IngredientSelectObjectSchema).optional()
}).strict();
export const IngredientArgsObjectSchema = makeSchema();
export const IngredientArgsObjectZodSchema = makeSchema();
