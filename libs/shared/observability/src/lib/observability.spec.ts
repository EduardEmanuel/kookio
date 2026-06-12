import { captureException } from '@sentry/angular';

import { reportError } from './observability';

vi.mock('@sentry/angular', () => ({ captureException: vi.fn() }));

describe('reportError', () => {
  it('forwards the error to Sentry, tagged with the op', () => {
    const err = new Error('boom');

    reportError(err, 'pantry.add');

    expect(captureException).toHaveBeenCalledWith(err, {
      tags: { op: 'pantry.add' },
    });
  });
});
