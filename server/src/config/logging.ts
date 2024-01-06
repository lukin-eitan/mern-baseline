import winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import morgan from 'morgan';
import express from 'express';
import config from './envConfig.js';

const { combine, timestamp, json, errors } = winston.format;

const createLogger = () => {
  const logger = winston.createLogger({
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports:
      config.NODE_ENV === 'production' && config.LOGTAIL_TOKEN
        ? [
            new winston.transports.Console(),
            new LogtailTransport(new Logtail(config.LOGTAIL_TOKEN))
          ]
        : [new winston.transports.Console()]
  });
  logger.info('Logging initialized in ' + config.NODE_ENV + ' environment.');
  return logger;
};

export const logger = createLogger();

export const initLogs = (app: express.Application) => {
  const morganMiddleware = morgan(
    (tokens, req, res) => {
      const status = tokens.status(req, res);
      const responseTime = tokens['response-time'](req, res);
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: status ? Number.parseFloat(status) : 500,
        content_length: tokens.res(req, res, 'content-length'),
        response_time: responseTime ? Number.parseFloat(responseTime) : 0
      });
    },
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => {
          const data = JSON.parse(message);
          logger.http(`incoming-request`, data);
        }
      }
    }
  );

  app.use(morganMiddleware);
};
