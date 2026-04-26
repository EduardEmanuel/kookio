export const URLS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  PANTRY: '/pantry',
  RECIPE: (id: string) => `/recipe/${id}`,
  ACCOUNT: '/account',
  ADMIN: '/admin',
  FORBIDDEN: '/403',
} as const;
