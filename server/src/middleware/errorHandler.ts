import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: { message: any; stack: any },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode
    ? res.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  switch (statusCode) {
    case StatusCodes.BAD_REQUEST:
      res.json({
        title: 'Bad Request',
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
        statusCode: statusCode
      });
      break;
    case StatusCodes.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
        statusCode: statusCode
      });
    case StatusCodes.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
        statusCode: statusCode
      });
    case StatusCodes.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
        statusCode: statusCode
      });
    case StatusCodes.INTERNAL_SERVER_ERROR:
      res.json({
        title: 'Server Error',
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
        statusCode: statusCode
      });
    default:
      console.log('Some other error', err);
  }
};

export default errorHandler;
