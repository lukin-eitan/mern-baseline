import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ConnectedUser } from '../API/connectedUser/connectedUser.js';
import { User as UserModel } from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../API/user/user.js';
import { usersSchemaToUsersApi } from '../utils/modelsToAPI/user.js';
import passport from 'passport';
import { authenticationInfoToErrorMapper } from '../utils/passportMappers/authenticationInfoToError.js';

//@desc check-auth a user
//@route GET /api/v1/auth/check-auth
//@access Public
export const checkauth = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const connectedUser: ConnectedUser = { isConnected: false };
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
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: Error, user: Express.User | false | null, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        const badUserErr = authenticationInfoToErrorMapper(info);
        res.status(StatusCodes.BAD_REQUEST);
        throw badUserErr;
      } else {
        req.login(user, (err: Error) => {
          if (err) {
            return next(err);
          }
          const returnUser: User = usersSchemaToUsersApi(user);
          return res.status(StatusCodes.OK).json(returnUser);
        });
      }
    }
  )(req, res, next);
};

//@desc logout a user
//@route GET /api/v1/auth/logout
//@access Private
export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      throw err;
    }
    res.clearCookie('sessionId');
    res.status(StatusCodes.OK).send('Logged out!');
  });
};
