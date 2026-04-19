import * as z from 'zod';
export const DietaryRestrictionUpsertResultSchema = z.object({
  id: z.string(),
  slug: z.string(),
  label: z.string(),
  emoji: z.string().optional(),
  description: z.string().optional(),
  users: z.array(z.unknown()),
});
