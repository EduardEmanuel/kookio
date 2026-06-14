import { z } from 'zod';

import { UserFindManyResultSchema as Base } from '../../prisma-zod-generator/schemas/index';

export const UserFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
