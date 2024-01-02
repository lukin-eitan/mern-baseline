import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { IUser, User } from '../models/userModel.js';
import { Error } from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { RegisterUser } from '../API/user/registerUser.js';
import 'express-async-errors';

//@desc Register a user
//@route POST /api/v1/users/register
//@access Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, firstName, lastName, profileImgUrl } =
    req.body as RegisterUser;
  const createdOn: Date = new Date();
  const user = new User({
    email,
    firstName,
    lastName,
    createdOn,
    profileImgUrl
  });
  User.register(user, password, function (err: Error, user: IUser) {
    if (err) {
      return next(err);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // TODO
      }
      return res.status(StatusCodes.OK).json(user);
    });
  });
  console.log('HERE');
};

//@desc get all users
//@route GET /api/v1/users
//@access Private
export const getUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(StatusCodes.OK).json(users);
  }
);

//@desc get user by id
//@route GET /api/v1/users/:id
//@access Private
export const getUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    res.status(StatusCodes.OK).json(user);
  }
);

//@desc get current user
//@route GET /api/v1/users/me
//@access Private
export const getMe = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?.id);
    res.status(StatusCodes.OK).json(user);
  }
);
