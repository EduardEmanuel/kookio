import { URLS } from '@kookio/feature-shell';

export type SkeletonAnimation =
  | 'pulse'
  | 'pulse-dark'
  | 'progress'
  | 'progress-dark'
  | false;
export type SkeletonAppearance =
  | 'line'
  | 'circle'
  | 'square'
  | 'custom-content';

export type PageSkeletonConfig = {
  count: number;
  animation?: SkeletonAnimation;
  appearance?: SkeletonAppearance;
};

export const PAGE_SKELETONS: Record<string, PageSkeletonConfig> = {
  [URLS.LOGIN]: { count: 4, animation: 'pulse', appearance: 'line' },
  [URLS.REGISTER]: { count: 5, animation: 'pulse', appearance: 'line' },
  [URLS.PANTRY]: { count: 6, animation: 'pulse', appearance: 'line' },
  [URLS.ACCOUNT]: { count: 3, animation: 'pulse', appearance: 'line' },
};
