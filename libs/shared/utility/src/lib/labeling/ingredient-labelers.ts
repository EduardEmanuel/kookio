import { makeEntityLabelers } from './make-entity-labelers';

export const ingredientLabelers = makeEntityLabelers({
  entityName: 'ingredient',
  whereIdentity: [
    {
      keys: ['userId_name.userId', 'userId_name.name'],
      format: (where) =>
        `ingredient(user=${where['userId_name'].userId}, name=${where['userId_name'].name})`,
    },
  ],
  createIdentity: [
    {
      keys: ['userId', 'name'],
      format: (data) =>
        `ingredient(user=${data['userId']}, name=${data['name']})`,
    },
  ],
});
