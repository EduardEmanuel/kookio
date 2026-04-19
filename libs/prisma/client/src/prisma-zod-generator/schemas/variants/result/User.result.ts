import * as z from 'zod';

import { RoleSchema } from '../../enums/Role.schema';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    email: z.string(),
    firebaseUid: z.string().nullable(),
    name: z.string().nullable(),
    roles: RoleSchema.array(),
    amr: z.array(z.string()),
    isDisabled: z.boolean(),
    deletedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    credentials: z.array(z.unknown()),
    profile: z.unknown().nullable(),
    pantryItems: z.array(z.unknown()),
    recipes: z.array(z.unknown()),
    collections: z.array(z.unknown()),
    mealPlans: z.array(z.unknown()),
    cookingSessions: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
