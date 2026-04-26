import { ingredientLabelers } from './ingredient-labelers';

describe('ingredientLabelers', () => {
  it('fromWhere: formats userId_name composite key', () => {
    expect(
      ingredientLabelers.fromWhere({
        userId_name: { userId: 'u1', name: 'Salt' },
      }),
    ).toBe('ingredient(user=u1, name=Salt)');
  });

  it('fromWhere: falls back to id then name then unknown', () => {
    expect(ingredientLabelers.fromWhere({ id: 'abc' })).toBe(
      'ingredient(id=abc)',
    );
    expect(ingredientLabelers.fromWhere({ name: 'Milk' })).toBe(
      'ingredient(name=Milk)',
    );
    expect(ingredientLabelers.fromWhere({ foo: 'bar' })).toBe(
      'ingredient(unknown)',
    );
    expect(ingredientLabelers.fromWhere(undefined)).toBe('ingredient(unknown)');
    expect(ingredientLabelers.fromWhere(null)).toBe('ingredient(unknown)');
  });

  it('fromCreateData: formats user+name identity', () => {
    expect(
      ingredientLabelers.fromCreateData({
        userId: 'u2',
        name: 'Butter',
      }),
    ).toBe('ingredient(user=u2, name=Butter)');
  });

  it('fromCreateData: falls back to name then unknown', () => {
    expect(ingredientLabelers.fromCreateData({ name: 'Sugar' })).toBe(
      'ingredient(name=Sugar)',
    );
    expect(ingredientLabelers.fromCreateData({})).toBe('ingredient(unknown)');
    expect(ingredientLabelers.fromCreateData(undefined)).toBe(
      'ingredient(unknown)',
    );
    expect(ingredientLabelers.fromCreateData(null)).toBe('ingredient(unknown)');
  });

  it('fromCreateManyData: formats list names', () => {
    expect(
      ingredientLabelers.fromCreateManyData([{ name: 'A' }, { name: 'B' }]),
    ).toBe('ingredients(2): 0. A; 1. B');
  });

  it('label(): routes by kind', () => {
    expect(
      ingredientLabelers.label({ kind: 'where', where: { id: '1' } }),
    ).toBe('ingredient(id=1)');
    expect(
      ingredientLabelers.label({ kind: 'create', data: { name: 'Flour' } }),
    ).toBe('ingredient(name=Flour)');
    expect(
      ingredientLabelers.label({ kind: 'createMany', data: [{ name: 'X' }] }),
    ).toBe('ingredients(1): 0. X');
  });
});
