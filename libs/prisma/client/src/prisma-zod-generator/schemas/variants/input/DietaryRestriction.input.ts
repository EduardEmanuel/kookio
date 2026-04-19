import * as z from 'zod';

// prettier-ignore
export const DietaryRestrictionInputSchema = z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    emoji: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    users: z.array(z.unknown())
}).strict();

export type DietaryRestrictionInputType = z.infer<
  typeof DietaryRestrictionInputSchema
>;
