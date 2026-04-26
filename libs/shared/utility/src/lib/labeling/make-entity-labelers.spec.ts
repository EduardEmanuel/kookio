import { makeEntityLabelers } from './make-entity-labelers';

describe('makeEntityLabelers', () => {
  it('uses default unknown label when where is null/undefined', () => {
    const l = makeEntityLabelers({ entityName: 'ingredient' });

    expect(l.fromWhere(undefined)).toBe('ingredient(unknown)');
    expect(l.fromWhere(null)).toBe('ingredient(unknown)');
    expect(l.label({ kind: 'where', where: undefined })).toBe(
      'ingredient(unknown)',
    );
  });

  it('uses custom unknownLabel when provided', () => {
    const l = makeEntityLabelers({
      entityName: 'ingredient',
      unknownLabel: 'ingredient(?)',
    });

    expect(l.fromWhere(undefined)).toBe('ingredient(?)');
    expect(l.fromCreateData(undefined)).toBe('ingredient(?)');
    expect(l.label({ kind: 'create', data: null })).toBe('ingredient(?)');
  });

  describe('fromWhere', () => {
    it('matches whereIdentity rule first (nested path)', () => {
      const l = makeEntityLabelers({
        entityName: 'ingredient',
        whereIdentity: [
          {
            keys: ['userId_name.userId', 'userId_name.name'],
            format: (where) =>
              `ingredient(user=${where.userId_name.userId}, name=${where.userId_name.name})`,
          },
        ],
      });

      expect(
        l.fromWhere({
          userId_name: { userId: 'u1', name: 'Salt' },
          id: 'should-not-win',
        }),
      ).toBe('ingredient(user=u1, name=Salt)');
    });

    it('falls back to id then name', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.fromWhere({ id: 'abc', name: 'X' })).toBe('ingredient(id=abc)');
      expect(l.fromWhere({ name: 'Flour' })).toBe('ingredient(name=Flour)');
    });

    it('returns unknown when no rule matched and no id/name present', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.fromWhere({ foo: 'bar' })).toBe('ingredient(unknown)');
    });

    it('treats missing nested keys as non-match (should fall back)', () => {
      const l = makeEntityLabelers({
        entityName: 'ingredient',
        whereIdentity: [
          {
            keys: ['userId_name.userId', 'userId_name.name'],
            format: () => 'SHOULD_NOT_HAPPEN',
          },
        ],
      });

      expect(l.fromWhere({ userId_name: { userId: 'u1' }, name: 'Milk' })).toBe(
        'ingredient(name=Milk)',
      );
    });

    it('supports KeyPath as string[]', () => {
      const l = makeEntityLabelers({
        entityName: 'ingredient',
        whereIdentity: [
          {
            keys: [
              ['userId_name', 'userId'],
              ['userId_name', 'name'],
            ],
            format: (where) =>
              `ingredient(user=${where.userId_name.userId}, name=${where.userId_name.name})`,
          },
        ],
      });

      expect(l.fromWhere({ userId_name: { userId: 'u2', name: 'Eggs' } })).toBe(
        'ingredient(user=u2, name=Eggs)',
      );
    });
  });

  describe('fromCreateData', () => {
    it('matches createIdentity rule first', () => {
      const l = makeEntityLabelers({
        entityName: 'ingredient',
        createIdentity: [
          {
            keys: ['userId', 'name'],
            format: (data) =>
              `ingredient(user=${data.userId}, name=${data.name})`,
          },
        ],
      });

      expect(l.fromCreateData({ userId: 'u1', name: 'Butter' })).toBe(
        'ingredient(user=u1, name=Butter)',
      );
    });

    it('falls back to name, else unknown', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.fromCreateData({ name: 'Sugar' })).toBe(
        'ingredient(name=Sugar)',
      );
      expect(l.fromCreateData({})).toBe('ingredient(unknown)');
    });
  });

  describe('fromCreateManyData', () => {
    it('returns plurals count=0 for null/undefined/empty array', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.fromCreateManyData(undefined)).toBe('ingredients(0)');
      expect(l.fromCreateManyData(null)).toBe('ingredients(0)');
      expect(l.fromCreateManyData([])).toBe('ingredients(0)');
    });

    it('formats array with default name key', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(
        l.fromCreateManyData([{ name: 'Apple' }, { name: 'Banana' }]),
      ).toBe('ingredients(2): 0. Apple; 1. Banana');
    });

    it('formats non-array single object as array of 1', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.fromCreateManyData({ name: 'Salt' })).toBe(
        'ingredients(1): 0. Salt',
      );
    });

    it('uses custom createManyNameKey', () => {
      const l = makeEntityLabelers({
        entityName: 'ingredient',
        createManyNameKey: 'title',
      });

      expect(l.fromCreateManyData([{ title: 'A' }, { title: 'B' }])).toBe(
        'ingredients(2): 0. A; 1. B',
      );
    });

    it('uses "(missing name)" when name key is absent', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.fromCreateManyData([{ nope: 1 }, {}])).toBe(
        'ingredients(2): 0. (missing name); 1. (missing name)',
      );
    });
  });

  describe('label()', () => {
    it('routes by kind to the correct formatter', () => {
      const l = makeEntityLabelers({ entityName: 'ingredient' });

      expect(l.label({ kind: 'where', where: { id: '1' } })).toBe(
        'ingredient(id=1)',
      );
      expect(l.label({ kind: 'create', data: { name: 'Milk' } })).toBe(
        'ingredient(name=Milk)',
      );
      expect(l.label({ kind: 'createMany', data: [{ name: 'A' }] })).toBe(
        'ingredients(1): 0. A',
      );
    });
  });
});
