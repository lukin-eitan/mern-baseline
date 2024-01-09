import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customError.js';
import { makeDGError } from '../errors/makeDGError.js';
import { config } from '../index.js';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const returnErr = makeDGError();
  returnErr.stack = config.nodeEnv === 'production' ? null : err.stack;

  if (err instanceof CustomError) {
    returnErr.name = err.name;
    returnErr.message = err.message;
    returnErr.err = err.errorContent;
    return res.status(err.statusCode).json(returnErr);
  }

  // Unhandled errors
  returnErr.name = 'Unknown';
  returnErr.message = 'Something went wrong';
  returnErr.err = err;
  console.error(returnErr);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(returnErr);
};

export default errorHandler;
