import * as z from 'zod';
export const UtensilUpdateResultSchema = z.nullable(
  z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    emoji: z.string().optional(),
    category: z.string().optional(),
    users: z.array(z.unknown()),
  }),
);
