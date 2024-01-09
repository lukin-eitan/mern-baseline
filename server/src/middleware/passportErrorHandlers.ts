import UserError from '../errors/userError.js';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { config } from '../index.js';

export const passportErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newErr = makePassportError(err);
  next(newErr);
};

export const makePassportError = (err: Error) => {
  let code: number = StatusCodes.BAD_REQUEST;
  // the name can be indicative of internal errors we do not wish to expose to client in production
  const name: string =
    config.nodeEnv === 'production' ? 'User Error' : err.name;
  let message: string = '';
  const logging: boolean = true;
  switch (err.name) {
    case 'MissingPasswordError': {
      message = 'No password was given';
      break;
    }
    case 'AttemptTooSoonError': {
      message = 'Account is currently locked. Try again later';
      break;
    }
    case 'TooManyAttemptsError': {
      message = 'Account locked due to too many failed login attempts';
      break;
    }
    case 'NoSaltValueStoredError': {
      code = StatusCodes.INTERNAL_SERVER_ERROR; // This is not a client error since the client doesn't deal with hashing the password
      message = 'Authentication not possible. No salt value stored';
      break;
    }
    case 'IncorrectPasswordError': {
      message = 'Password or username are incorrect';
      break;
    }
    case 'IncorrectUsernameError': {
      message = 'Password or username are incorrect';
      break;
    }
    case 'MissingUsernameError': {
      message = 'No username was given';
      break;
    }
    case 'UserExistsError': {
      message = 'A user with the given email is already registered';
      break;
    }
    default: {
      code = StatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Server error';
    }
  }
  return new UserError({
    code: code,
    name: name,
    message: message,
    logging: logging
  });
};
