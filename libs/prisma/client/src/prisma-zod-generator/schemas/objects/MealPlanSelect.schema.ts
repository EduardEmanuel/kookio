import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { MealPlanSlotFindManySchema as MealPlanSlotFindManySchema } from '../findManyMealPlanSlot.schema';
import { MealPlanCountOutputTypeArgsObjectSchema as MealPlanCountOutputTypeArgsObjectSchema } from './MealPlanCountOutputTypeArgs.schema';

const makeSchema = () =>
  z
    .object({
      id: z.boolean().optional(),
      userId: z.boolean().optional(),
      name: z.boolean().optional(),
      startDate: z.boolean().optional(),
      endDate: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
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
export const MealPlanSelectObjectSchema: z.ZodType<Prisma.MealPlanSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.MealPlanSelect>;
export const MealPlanSelectObjectZodSchema = makeSchema();
