import * as z from 'zod';

// prettier-ignore
export const UserUtensilResultSchema = z.object({
    userId: z.string(),
    utensilId: z.string(),
    user: z.unknown(),
    utensil: z.unknown()
}).strict();

export type UserUtensilResultType = z.infer<typeof UserUtensilResultSchema>;
