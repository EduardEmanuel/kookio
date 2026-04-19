import * as z from 'zod';
export const DietaryRestrictionGroupByResultSchema = z.array(
  z.object({
    id: z.string(),
    slug: z.string(),
    label: z.string(),
    emoji: z.string(),
    description: z.string(),
    _count: z
      .object({
        id: z.number(),
        slug: z.number(),
        label: z.number(),
        emoji: z.number(),
        description: z.number(),
        users: z.number(),
      })
      .optional(),
    _min: z
      .object({
        id: z.string().nullable(),
        slug: z.string().nullable(),
        label: z.string().nullable(),
        emoji: z.string().nullable(),
        description: z.string().nullable(),
      })
      .nullable()
      .optional(),
    _max: z
      .object({
        id: z.string().nullable(),
        slug: z.string().nullable(),
        label: z.string().nullable(),
        emoji: z.string().nullable(),
        description: z.string().nullable(),
      })
      .nullable()
      .optional(),
  }),
);
