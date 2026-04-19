import * as z from 'zod';

// prettier-ignore
export const UtensilResultSchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    emoji: z.string().nullable(),
    category: z.string().nullable(),
    users: z.array(z.unknown())
}).strict();

export type UtensilResultType = z.infer<typeof UtensilResultSchema>;
