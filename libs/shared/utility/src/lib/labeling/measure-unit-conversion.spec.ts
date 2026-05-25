import { describe, expect, it } from 'vitest';

import { convertMeasure, isConvertibleUnit } from './measure-unit-labels';

describe('convertMeasure', () => {
  describe('identity', () => {
    it('returns the same amount when from === to', () => {
      expect(convertMeasure(123, 'G', 'G')).toBe(123);
      expect(convertMeasure(0, 'ML', 'ML')).toBe(0);
      expect(convertMeasure(5.5, 'PIECE', 'PIECE')).toBe(5.5);
    });
  });

  describe('weight family', () => {
    it('converts g to kg', () => {
      expect(convertMeasure(1500, 'G', 'KG')).toBe(1.5);
    });

    it('converts kg to g', () => {
      expect(convertMeasure(0.25, 'KG', 'G')).toBe(250);
    });

    it('converts oz to g (US ounce ≈ 28.3495 g)', () => {
      expect(convertMeasure(1, 'OZ', 'G')).toBeCloseTo(28.3495, 4);
    });

    it('converts lb to kg', () => {
      expect(convertMeasure(1, 'LB', 'KG')).toBeCloseTo(0.453592, 5);
    });

    it('converts oz to lb (16 oz = 1 lb)', () => {
      expect(convertMeasure(16, 'OZ', 'LB')).toBeCloseTo(1, 5);
    });
  });

  describe('volume family', () => {
    it('converts ml to l', () => {
      expect(convertMeasure(500, 'ML', 'L')).toBe(0.5);
    });

    it('converts l to ml', () => {
      expect(convertMeasure(2, 'L', 'ML')).toBe(2000);
    });

    it('converts tsp to ml (rounded factor 5 ml/tsp)', () => {
      expect(convertMeasure(2, 'TSP', 'ML')).toBe(10);
    });

    it('converts tbsp to ml (rounded factor 15 ml/tbsp)', () => {
      expect(convertMeasure(1, 'TBSP', 'ML')).toBe(15);
    });

    it('converts cup to ml (rounded factor 240 ml/cup)', () => {
      expect(convertMeasure(1, 'CUP', 'ML')).toBe(240);
    });

    it('converts cup to tbsp (240 / 15 = 16)', () => {
      expect(convertMeasure(1, 'CUP', 'TBSP')).toBe(16);
    });
  });

  describe('cross-family and unitless', () => {
    it('returns null for weight ↔ volume', () => {
      expect(convertMeasure(100, 'G', 'ML')).toBeNull();
      expect(convertMeasure(1, 'L', 'KG')).toBeNull();
    });

    it('returns null for any conversion involving PIECE', () => {
      expect(convertMeasure(1, 'PIECE', 'G')).toBeNull();
      expect(convertMeasure(1, 'ML', 'PIECE')).toBeNull();
    });

    it('returns null for any conversion involving imprecise units', () => {
      expect(convertMeasure(1, 'PINCH', 'G')).toBeNull();
      expect(convertMeasure(1, 'TO_TASTE', 'ML')).toBeNull();
      expect(convertMeasure(1, 'GARNISH', 'PIECE')).toBeNull();
    });

    it('returns null for OTHER', () => {
      expect(convertMeasure(1, 'OTHER', 'G')).toBeNull();
      expect(convertMeasure(1, 'G', 'OTHER')).toBeNull();
    });

    it('returns null for SLICE, CLOVE, BUNCH — only same-unit compares', () => {
      expect(convertMeasure(2, 'SLICE', 'PIECE')).toBeNull();
      expect(convertMeasure(3, 'CLOVE', 'G')).toBeNull();
      expect(convertMeasure(1, 'BUNCH', 'PIECE')).toBeNull();
    });

    it('still returns the amount for same-unit non-convertible families', () => {
      // Identity short-circuit applies even when the unit is unitless.
      expect(convertMeasure(7, 'SLICE', 'SLICE')).toBe(7);
      expect(convertMeasure(2, 'TO_TASTE', 'TO_TASTE')).toBe(2);
    });
  });
});

describe('isConvertibleUnit', () => {
  it('returns true for weight units', () => {
    expect(isConvertibleUnit('G')).toBe(true);
    expect(isConvertibleUnit('KG')).toBe(true);
    expect(isConvertibleUnit('OZ')).toBe(true);
    expect(isConvertibleUnit('LB')).toBe(true);
  });

  it('returns true for volume units', () => {
    expect(isConvertibleUnit('ML')).toBe(true);
    expect(isConvertibleUnit('L')).toBe(true);
    expect(isConvertibleUnit('TSP')).toBe(true);
    expect(isConvertibleUnit('TBSP')).toBe(true);
    expect(isConvertibleUnit('CUP')).toBe(true);
  });

  it('returns false for piece/slice/clove/bunch', () => {
    expect(isConvertibleUnit('PIECE')).toBe(false);
    expect(isConvertibleUnit('SLICE')).toBe(false);
    expect(isConvertibleUnit('CLOVE')).toBe(false);
    expect(isConvertibleUnit('BUNCH')).toBe(false);
  });

  it('returns false for imprecise / unitless markers', () => {
    expect(isConvertibleUnit('PINCH')).toBe(false);
    expect(isConvertibleUnit('TO_TASTE')).toBe(false);
    expect(isConvertibleUnit('TO_SERVE')).toBe(false);
    expect(isConvertibleUnit('GARNISH')).toBe(false);
    expect(isConvertibleUnit('OTHER')).toBe(false);
  });
});
