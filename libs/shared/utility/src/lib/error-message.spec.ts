import { describe, expect, it } from 'vitest';

import { messageFromError } from './error-message';

describe('messageFromError', () => {
  it('returns the error message when present', () => {
    expect(messageFromError(new Error('boom'), 'fallback')).toBe('boom');
    expect(messageFromError({ message: 'custom' }, 'fallback')).toBe('custom');
  });

  it('falls back when there is no usable message', () => {
    expect(messageFromError(null, 'fallback')).toBe('fallback');
    expect(messageFromError('a string', 'fallback')).toBe('fallback');
    expect(messageFromError({ message: '' }, 'fallback')).toBe('fallback');
    expect(messageFromError({ message: 42 }, 'fallback')).toBe('fallback');
    expect(messageFromError({}, 'fallback')).toBe('fallback');
  });
});
