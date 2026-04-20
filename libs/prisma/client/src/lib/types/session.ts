import type { Role } from '../../prisma-zod-generator/schemas/index';

export type UserId = string;

export type AuditEvent =
  | { type: 'login_success'; uid: UserId }
  | { type: 'login_fail'; reason: string }
  | { type: 'logout'; uid: UserId }
  | { type: 'register'; uid: string }
  | { type: 'role_granted'; uid: UserId; role: Role }
  | { type: 'role_revoked'; uid: UserId; role: Role }
  | { type: 'role_denied'; uid: UserId; route: string; need: Role[] };

export type AuthSession = {
  uid: UserId;
  email: string;
  roles: Role[];
  amr: string[];
};
