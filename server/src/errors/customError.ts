import { CustomErrorContent } from '../API/dgError/dgError.js';

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly name: string;
  abstract readonly errorContent: CustomErrorContent;
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
