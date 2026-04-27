import { describe, expect, it } from 'vitest';

import { routeMeta } from './(home).page';

describe('(home) route', () => {
  it('redirects to /recipes with full path match', () => {
    expect(routeMeta).toEqual({
      redirectTo: '/recipes',
      pathMatch: 'full',
    });
  });
});
