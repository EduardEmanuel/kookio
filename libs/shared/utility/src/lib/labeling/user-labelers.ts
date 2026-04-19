import { makeEntityLabelers } from './make-entity-labelers';

export const userLabelers = makeEntityLabelers({
  entityName: 'user',
  whereIdentity: [
    {
      keys: ['email'],
      format: (where) => `user(email=${where['email']})`,
    },
  ],
  createIdentity: [
    {
      keys: ['email'],
      format: (data) => `user(email=${data['email']})`,
    },
  ],
  createManyNameKey: 'email',
});
