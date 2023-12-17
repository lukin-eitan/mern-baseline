import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.status(StatusCodes.UNAUTHORIZED);
    return res;
  }
  next();
};
