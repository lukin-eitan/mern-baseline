import { Request, Response, NextFunction } from 'express';
import { ROLES } from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

export const checkUserIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === ROLES.admin) {
    return next();
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'Access denied. Insufficient permissions.' });
  }
};
