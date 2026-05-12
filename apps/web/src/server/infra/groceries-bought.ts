import type { GroceriesBoughtStore } from '@kookio/server-trpc';

import { getJSON, getRedis, redisKey, setJSON } from './redis';

// 7 days — covers a typical shopping week. TTL is refreshed on every write,
// so an active shopper extends their state indefinitely while inactive
// users free their slot under the 30 MB ceiling.
const TTL_SECONDS = 7 * 24 * 60 * 60;

const buildKey = (userId: string): string =>
  redisKey('groceries', 'bought', userId);

export const redisGroceriesBoughtStore: GroceriesBoughtStore = {
  get: async (userId) => {
    const ids = await getJSON<readonly string[]>(buildKey(userId));
    return ids ?? [];
  },
  set: async (userId, ids) => {
    const key = buildKey(userId);
    if (ids.length === 0) {
      // Free the slot rather than holding an empty array under TTL.
      const redis = await getRedis();
      await redis.del(key);
      return;
    }
    await setJSON(key, [...ids], TTL_SECONDS);
  },
};
