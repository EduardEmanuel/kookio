import { z } from 'zod';

import { RecipeCollectionEntryFindManyResultSchema as Base } from '../schemas/index';

export const RecipeCollectionEntryFindManyResultSchema = Base.extend({
  pagination: Base.shape.pagination.extend({
    pageSize: z.number().int().min(0),
    totalPages: z.number().int().min(1),
  }),
});
