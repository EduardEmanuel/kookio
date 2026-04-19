import * as z from 'zod';

// prettier-ignore
export const UserUtensilModelSchema = z.object({
    userId: z.string(),
    utensilId: z.string(),
    user: z.unknown(),
    utensil: z.unknown()
}).strict();

export type UserUtensilPureType = z.infer<typeof UserUtensilModelSchema>;
