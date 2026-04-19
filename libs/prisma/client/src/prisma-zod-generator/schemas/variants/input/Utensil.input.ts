import * as z from 'zod';

// prettier-ignore
export const UtensilInputSchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    emoji: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    users: z.array(z.unknown())
}).strict();

export type UtensilInputType = z.infer<typeof UtensilInputSchema>;
