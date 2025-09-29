import { pino } from 'pino';

const isProd = false; //process.env.NODE_ENV === 'production';  // Adjust this as needed

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
  level: 'debug',
});