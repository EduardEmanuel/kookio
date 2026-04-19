import * as z from 'zod';
export const DietaryRestrictionDeleteResultSchema = z.nullable(
  z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    emoji: z.string().optional(),
    description: z.string().optional(),
    users: z.array(z.unknown()),
  }),
);
