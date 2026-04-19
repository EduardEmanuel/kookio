export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  RATE_LIMITED = 'RATE_LIMITED',
}

export type ServerFeatures = {
  webauthn: boolean;
  pwa: boolean;
  ionicShell: boolean;
};
