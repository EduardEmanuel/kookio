const BASE_URL = process.env['BASE_URL'] ?? 'http://localhost:4200';

const ROUTES = [
  '/',
  '/about',
  '/login',
  '/register',
  '/pantry',
  '/account',
  '/admin',
  '/onboarding',
  '/dashboard',
  '/recipes',
  '/recipes/match',
  '/recipes/saved',
  '/plan',
  '/groceries',
  '/403',
  '/404',
];

const warmRoute = async (path: string): Promise<void> => {
  try {
    await fetch(`${BASE_URL}${path}`, {
      signal: AbortSignal.timeout(120_000),
    });
  } catch {
    // warm-up is best-effort
  }
};

export default async (): Promise<void> => {
  await Promise.all(ROUTES.map(warmRoute));
};
