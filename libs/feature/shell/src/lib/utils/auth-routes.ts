export const AUTH_ROUTES = [
  '/login',
  '/register',
  '/onboarding',
  '/404',
  '/401',
] as const;

export const isOnAuthRoute = (url: string | undefined | null): boolean =>
  !!url && AUTH_ROUTES.some((p) => url.startsWith(p));
