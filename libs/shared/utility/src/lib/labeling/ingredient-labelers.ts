import { makeEntityLabelers } from './make-entity-labelers';

export const ingredientLabelers = makeEntityLabelers({
  entityName: 'ingredient',
  whereIdentity: [
    {
      keys: ['userId_name.userId', 'userId_name.name'],
      format: (where) => {
        const compound = where['userId_name'] as Record<string, unknown>;
        return `ingredient(user=${compound['userId']}, name=${compound['name']})`;
      },
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
