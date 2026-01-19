export type UserId = string;

export enum Role {
  USER = 'USER',
  NUTRITIONIST = 'NUTRITIONIST',
  PRODUCER = 'PRODUCER',
  ADMIN = 'ADMIN',
}

export type AuthSession = {
  uid: UserId;
  email: string;
  roles: Role[];
  amr: string[];
};

export type ServerFeatures = {
  webauthn: boolean;
  pwa: boolean;
  ionicShell: boolean;
};

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
}

export type AuditEvent =
  | { type: 'login_success'; uid: UserId }
  | { type: 'login_fail'; reason: string }
  | { type: 'role_denied'; uid: UserId; route: string; need: Role[] };
