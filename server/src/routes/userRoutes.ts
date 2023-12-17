import express from 'express';
import {
  register,
  getUsers,
  getUser,
  getMe
} from '../controllers/userController.js';
import { checkUserIsAdmin } from '../middleware/authorizationMiddleware.js';
import { isLoggedIn } from '../middleware/authenticationMiddleware.js';

export const router = express.Router();

router.route('/').get(isLoggedIn, checkUserIsAdmin, getUsers);
router.route('/:id').get(isLoggedIn, getUser);
router.route('/me').get(isLoggedIn, getMe);
router.route('/register').post(register);
