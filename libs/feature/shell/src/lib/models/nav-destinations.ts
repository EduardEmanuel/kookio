import { URLS } from '@kookio/shared-utility';

import type { NavItem } from './nav-item.model';

/**
 * Canonical primary navigation destinations.
 *
 * Both the desktop sidenav and the mobile bottom-tabs render this list
 * verbatim — keeping the surfaces in sync is what this constant is for.
 * Labels are deliberately one word so a 5-tab bottom bar fits iPhone SE
 * (375 px) without truncation.
 */
export const NAV_DESTINATIONS: readonly NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: URLS.DASHBOARD },
  { label: 'Saved', icon: 'bookmark', route: URLS.RECIPES_SAVED },
  { label: 'Pantry', icon: 'kitchen', route: URLS.PANTRY },
  { label: 'Plan', icon: 'calendar_today', route: URLS.PLAN },
  { label: 'Groceries', icon: 'shopping_cart', route: URLS.SHOPPING_LIST },
];
