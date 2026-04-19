import * as z from 'zod';

// prettier-ignore
export const MealAreaResultSchema = z.object({
    id: z.string(),
    externalId: z.string(),
    name: z.string(),
    flag: z.string().nullable(),
    createdAt: z.date(),
    recipes: z.array(z.unknown())
}).strict();

export type MealAreaResultType = z.infer<typeof MealAreaResultSchema>;
