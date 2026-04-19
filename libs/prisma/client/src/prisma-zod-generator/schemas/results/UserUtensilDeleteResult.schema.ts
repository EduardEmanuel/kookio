import * as z from 'zod';
export const UserUtensilDeleteResultSchema = z.nullable(
  z.object({
    userId: z.string(),
    utensilId: z.string(),
    user: z.unknown(),
    utensil: z.unknown(),
  }),
);
