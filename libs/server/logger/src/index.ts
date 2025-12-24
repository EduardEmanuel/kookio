import { pino } from 'pino';

const isProd = process.env['VERCEL'] === '1' || process.env['NODE_ENV'] === 'production';

export const logger = pino({
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
  level: process.env['LOG_LEVEL'] ?? 'debug',
});