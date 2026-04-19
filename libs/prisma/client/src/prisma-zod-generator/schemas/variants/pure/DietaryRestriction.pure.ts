import * as z from 'zod';

// prettier-ignore
export const DietaryRestrictionModelSchema = z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    emoji: z.string().nullable(),
    description: z.string().nullable(),
    users: z.array(z.unknown())
}).strict();

export type DietaryRestrictionPureType = z.infer<
  typeof DietaryRestrictionModelSchema
>;
