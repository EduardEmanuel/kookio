import * as z from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.string(),
    email: z.string(),
    firebaseUid: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    roles: RoleSchema.array(),
    amr: z.array(z.string()),
    isDisabled: z.boolean(),
    deletedAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    credentials: z.array(z.unknown()),
    profile: z.unknown().optional().nullable(),
    pantryItems: z.array(z.unknown()),
    recipes: z.array(z.unknown()),
    collections: z.array(z.unknown()),
    mealPlans: z.array(z.unknown()),
    cookingSessions: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
