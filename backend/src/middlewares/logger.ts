import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'error.log'),
    }),
  ],
  format: winston.format.json(),
  meta: true,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
  level(_req, res) {
    if (res.statusCode >= 100 && res.statusCode < 400) {
      return 'info';
    }
    if (res.statusCode >= 400 && res.statusCode < 600) {
      return 'error';
    }
    return 'info';
  },
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../logs', 'error.log'),
    }),
  ],
  format: winston.format.json(),
  meta: true,
  msg: 'ERROR {{err.message}} - {{req.method}} {{req.url}} \n {{err.stack}}',
});
