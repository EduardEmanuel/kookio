import type { Role } from '@kookio/prisma-client';
import type { MaterialSymbolName } from '@kookio/shared-utility';

export interface NavItem {
  label: string;
  icon: MaterialSymbolName;
  route: string;
  requiresRole?: Role;
}
