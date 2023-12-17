import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel.js';
import { Error } from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { RegisterUser } from '../API/user/registerUser.js';

//@desc Register a user
//@route POST /api/v1/users/register
//@access Public
export const register = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Registering: ', req.body);
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
      const registeredUser = await User.register(user, password);
      console.log('registered, now logging in...', registeredUser);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash('success', 'Welcome!');
        return res.status(StatusCodes.OK).json(registeredUser);
      });
      console.log('Logged in!');
    } catch (e: unknown) {
      if (e instanceof Error.ValidationError) {
        req.flash('error', e.message);
      } else {
        console.log(e);
        req.flash('error', 'Something went wrong!');
      }
      res.status(StatusCodes.BAD_REQUEST);
    }
  }
);

//@desc get all users
//@route GET /api/v1/users
//@access Private
export const getUsers = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(StatusCodes.OK).json(users);
  }
);

//@desc get user by id
//@route GET /api/v1/users/:id
//@access Private
export const getUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    res.status(StatusCodes.OK).json(user);
  }
);

//@desc get current user
//@route GET /api/v1/users/me
//@access Private
export const getMe = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    res.status(StatusCodes.OK).json(user);
  }
);
