import { describe, expect, it } from 'vitest';

import { DEFAULT_PIECE_GRAMS, fromGrams, toGrams } from './measure-unit-labels';

describe('toGrams', () => {
  describe('weight family (ingredient-agnostic)', () => {
    it('returns the same amount for grams', () => {
      expect(toGrams(250, 'G')).toBe(250);
    });

    it('converts kilograms to grams', () => {
      expect(toGrams(1.5, 'KG')).toBe(1500);
    });

    it('converts ounces to grams (28.3495 g/oz)', () => {
      expect(toGrams(1, 'OZ')).toBeCloseTo(28.3495, 4);
    });

    it('converts pounds to grams (453.592 g/lb)', () => {
      expect(toGrams(1, 'LB')).toBeCloseTo(453.592, 3);
    });
  });

  describe('volume family (water density, 1 g/ml)', () => {
    it('converts millilitres to grams 1:1', () => {
      expect(toGrams(200, 'ML')).toBe(200);
    });

    it('converts litres to grams', () => {
      expect(toGrams(1, 'L')).toBe(1000);
    });

    it('converts tsp / tbsp / cup with cooking-grade rounded factors', () => {
      expect(toGrams(2, 'TSP')).toBe(10);
      expect(toGrams(1, 'TBSP')).toBe(15);
      expect(toGrams(1, 'CUP')).toBe(240);
    });
  });

  describe('PINCH', () => {
    it('is a fixed 0.5 g (cooking-scale noise floor)', () => {
      expect(toGrams(1, 'PINCH')).toBe(0.5);
      expect(toGrams(4, 'PINCH')).toBe(2);
    });
  });

  describe('flavour-only units', () => {
    it('returns 0 for TO_TASTE / TO_SERVE / GARNISH regardless of amount', () => {
      expect(toGrams(1, 'TO_TASTE')).toBe(0);
      expect(toGrams(100, 'TO_SERVE')).toBe(0);
      expect(toGrams(2, 'GARNISH')).toBe(0);
    });

    it('ignores pieceGrams for flavour-only units (always 0)', () => {
      expect(toGrams(1, 'TO_TASTE', 5)).toBe(0);
    });
  });

  describe('piece-class units (PIECE / SLICE / CLOVE / BUNCH / OTHER)', () => {
    it('uses pieceGrams when supplied', () => {
      expect(toGrams(2, 'PIECE', 60)).toBe(120); // 2 eggs at 60g
      expect(toGrams(3, 'CLOVE', 5)).toBe(15); // 3 garlic cloves
      expect(toGrams(1, 'SLICE', 30)).toBe(30); // bread slice
      expect(toGrams(1, 'BUNCH', 50)).toBe(50);
      expect(toGrams(1, 'OTHER', 100)).toBe(100);
    });

    it('returns null when pieceGrams is missing and allowDefault is false', () => {
      expect(toGrams(2, 'PIECE')).toBeNull();
      expect(toGrams(2, 'PIECE', null)).toBeNull();
      // Explicit allowDefault: false is the same as the default.
      expect(toGrams(2, 'CLOVE', null, { allowDefault: false })).toBeNull();
    });

    it('falls back to DEFAULT_PIECE_GRAMS when allowDefault is true', () => {
      expect(toGrams(1, 'PIECE', null, { allowDefault: true })).toBe(
        DEFAULT_PIECE_GRAMS,
      );
      expect(toGrams(2, 'CLOVE', null, { allowDefault: true })).toBe(
        DEFAULT_PIECE_GRAMS * 2,
      );
    });

    it('treats zero or negative pieceGrams as missing', () => {
      // pieceGrams of 0 (or negative) is a data error — treat as missing to
      // avoid silently decrementing by 0.
      expect(toGrams(2, 'PIECE', 0)).toBeNull();
      expect(toGrams(2, 'PIECE', -5)).toBeNull();
      expect(toGrams(2, 'PIECE', 0, { allowDefault: true })).toBe(
        DEFAULT_PIECE_GRAMS * 2,
      );
    });

    it('prefers the supplied pieceGrams over the default even when allowDefault is true', () => {
      // The default is the fallback, not an override.
      expect(toGrams(1, 'PIECE', 200, { allowDefault: true })).toBe(200);
    });
  });
});

describe('fromGrams', () => {
  describe('inverse of toGrams across every supported unit', () => {
    it('round-trips weight units', () => {
      expect(fromGrams(28.3495, 'OZ')).toBeCloseTo(1, 5);
      expect(fromGrams(1500, 'KG')).toBe(1.5);
    });

    it('round-trips volume units under water density', () => {
      expect(fromGrams(240, 'CUP')).toBe(1);
      expect(fromGrams(15, 'TBSP')).toBe(1);
    });

    it('round-trips PINCH', () => {
      expect(fromGrams(2, 'PINCH')).toBe(4);
    });

    it('round-trips piece-class with explicit pieceGrams', () => {
      expect(fromGrams(120, 'PIECE', 60)).toBe(2);
      expect(fromGrams(15, 'CLOVE', 5)).toBe(3);
    });

    it('falls back to DEFAULT_PIECE_GRAMS when allowDefault is true', () => {
      expect(fromGrams(200, 'PIECE', null, { allowDefault: true })).toBe(2);
    });

    it('returns null for piece-class without pieceGrams and no default', () => {
      expect(fromGrams(100, 'PIECE')).toBeNull();
    });

    it('returns 0 for flavour-only units', () => {
      expect(fromGrams(50, 'TO_TASTE')).toBe(0);
    });
  });

  describe('display-unit drift use case', () => {
    it('returns a fractional piece count after a partial decrement', () => {
      // 1 onion (150 g) − 0.3 onion (45 g) = 105 g remaining = 0.7 onion.
      const remainingGrams =
        toGrams(1, 'PIECE', 150)! - toGrams(0.3, 'PIECE', 150)!;
      expect(fromGrams(remainingGrams, 'PIECE', 150)).toBeCloseTo(0.7, 10);
    });
  });
});
