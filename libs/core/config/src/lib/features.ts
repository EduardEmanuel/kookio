import type { ServerFeatures } from '@kookio/core-security';

const bool = (v: string | undefined, def = false): boolean => {
  if (v == null) return def;

  const s = String(v).toLowerCase().trim();

  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
};

export const readServerFeaturesFromEnv = (): ServerFeatures => {
  return {
    webauthn: bool(process.env['FEATURE_WEBAUTHN'], false),
    pwa: bool(process.env['FEATURE_PWA'], false),
    ionicShell: bool(process.env['FEATURE_IONIC_SHELL'], false),
  };
};
