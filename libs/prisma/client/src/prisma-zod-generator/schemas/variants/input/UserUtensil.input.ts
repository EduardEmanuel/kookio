import * as z from 'zod';

// prettier-ignore
export const UserUtensilInputSchema = z.object({
    userId: z.string(),
    utensilId: z.string(),
    user: z.unknown(),
    utensil: z.unknown()
}).strict();

export type UserUtensilInputType = z.infer<typeof UserUtensilInputSchema>;
