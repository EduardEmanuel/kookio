import type {
  MealPlanDraftRecord,
  MealPlanDraftStore,
} from '@kookio/server-trpc';

import { getJSON, getRedis, redisKey, setJSON } from './redis';

// 7 days — covers a typical planning week. TTL refreshes on every set,
// so an active drafter extends indefinitely while inactive users free
// the slot under the 30 MB ceiling.
const TTL_SECONDS = 7 * 24 * 60 * 60;

const buildKey = (userId: string): string => redisKey('plan', 'draft', userId);

export const redisMealPlanDraftStore: MealPlanDraftStore = {
  get: async (userId) => getJSON<MealPlanDraftRecord>(buildKey(userId)),
  set: async (userId, payload) => {
    await setJSON(buildKey(userId), payload, TTL_SECONDS);
  },
  clear: async (userId) => {
    const redis = await getRedis();
    await redis.del(buildKey(userId));
  },
};
