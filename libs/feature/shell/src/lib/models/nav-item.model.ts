import type { Role } from '@kookio/prisma-client';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  requiresRole?: Role;
}
