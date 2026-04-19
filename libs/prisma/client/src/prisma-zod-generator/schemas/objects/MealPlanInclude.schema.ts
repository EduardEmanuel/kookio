import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { MealPlanSlotFindManySchema as MealPlanSlotFindManySchema } from '../findManyMealPlanSlot.schema';
import { MealPlanCountOutputTypeArgsObjectSchema as MealPlanCountOutputTypeArgsObjectSchema } from './MealPlanCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      slots: z
        .union([z.boolean(), z.lazy(() => MealPlanSlotFindManySchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => MealPlanCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict();
export const MealPlanIncludeObjectSchema: z.ZodType<Prisma.MealPlanInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanInclude>;
export const MealPlanIncludeObjectZodSchema = makeSchema();
