import { z } from 'zod';

import { UserProfileFindManyResultSchema as Base } from '../../prisma-zod-generator/schemas/index';

export const UserProfileFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
