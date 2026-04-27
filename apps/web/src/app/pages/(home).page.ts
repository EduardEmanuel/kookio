import type { RouteMeta } from '@analogjs/router';

import { URLS } from '@kookio/shared-utility';

export const routeMeta: RouteMeta = {
  redirectTo: URLS.RECIPES,
  pathMatch: 'full',
};
