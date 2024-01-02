import { CustomErrorContent } from '../API/dgError/dgError.js';
import { CustomError } from './customError.js';
import { StatusCodes } from 'http-status-codes';

export default class UserError extends CustomError {
  private static readonly _statusCode = StatusCodes.BAD_REQUEST;
  private readonly _code: number;
  private readonly _name: string;
  private readonly _logging: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _context: { [key: string]: any };

  constructor(params?: {
    code?: number;
    name?: string;
    message?: string;
    logging?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: { [key: string]: any };
  }) {
    const { code, message, name, logging, context } = params || {};

    super(message || 'Bad Request');
    this._code = code || UserError._statusCode;
    this._name = name || 'Unknown';
    this._logging = logging || false;
    this._context = context || {};

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, UserError.prototype);
  }

  get errorContent(): CustomErrorContent {
    return {
      name: this._name,
      message: this.message,
      context: this._context
    };
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }

  get name() {
    return this._name;
  }
}
