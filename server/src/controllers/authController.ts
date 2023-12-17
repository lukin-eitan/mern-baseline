import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ConnectedUser } from '../API/connectedUser/connectedUser.js';
import { User as UserModel } from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../API/user/user.js';
import { usersSchemaToUsersApi } from '../utils/modelsToAPI/user.js';

//@desc check-auth a user
//@route GET /api/v1/auth/check-auth
//@access Public
export const checkauth = expressAsyncHandler(
  async (req: Request, res: Response) => {
    console.log('getting auth call', req.isAuthenticated());
    let connectedUser: ConnectedUser = { isConnected: false };
    if (!req.isAuthenticated()) {
      res.status(StatusCodes.OK).json(connectedUser);
      return;
    }

    // this is a bit redundant since req.user *should* be "me".
    // However our single source of truth is the DB.
    const user = await UserModel.findById(req.user?.id);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('User not found');
    }
    connectedUser.isConnected = true;
    connectedUser.user = usersSchemaToUsersApi(user);
    res.status(StatusCodes.OK).json(connectedUser);
  }
);

//@desc login a user
//@route POST /api/v1/auth/login
//@access Public
export const login = (req: Request, res: Response) => {
  req.flash('success', 'Welcome back!');
  if (!req.user) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('User not found');
  }
  const user: User = usersSchemaToUsersApi(req.user);
  res.status(StatusCodes.OK).json(user);
};

//@desc logout a user
//@route GET /api/v1/auth/logout
//@access Private
export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('sessionId');
    res.status(StatusCodes.OK).send('Logged out!');
  });
};
