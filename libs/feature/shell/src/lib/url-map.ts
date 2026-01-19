export const URLS = {
  HOME: '/',
  PANTRY: '/pantry',
  RECIPE: (id: string) => `/recipe/${id}`,
  ACCOUNT: '/account',
  ADMIN: '/admin',
} as const;
