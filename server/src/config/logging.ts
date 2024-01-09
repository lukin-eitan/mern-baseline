import winston from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import morgan from 'morgan';
import express from 'express';
import { config } from '../index.js';

export const initLogs = (app: express.Application): winston.Logger => {
  const logger = createLogger();
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
  logger.info('Logger initialized in ' + config.nodeEnv + ' environment.');
  return logger;
};

const { combine, timestamp, json, errors } = winston.format;

const createLogger = () => {
  const logger = winston.createLogger({
    level: config.nodeEnv === 'production' ? 'info' : 'debug',
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports:
      config.nodeEnv === 'production' && config.logManagerToken
        ? [
            new winston.transports.Console(),
            new LogtailTransport(new Logtail(config.logManagerToken))
          ]
        : [new winston.transports.Console()]
  });
  return logger;
};
