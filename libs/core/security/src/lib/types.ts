export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  RATE_LIMITED = 'RATE_LIMITED',
}

export type ServerFeatures = {
  pwa: boolean;
  ionicShell: boolean;
};
