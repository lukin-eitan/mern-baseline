import express from 'express';
import { checkauth, login, logout } from '../controllers/authController.js';
import { isLoggedIn } from '../middleware/authenticationMiddleware.js';
import { passportErrorHandler } from '../middleware/passportErrorHandlers.js';

export const router = express.Router();

router.route('/check-auth').get(checkauth);
router.route('/login').post(login, passportErrorHandler);
router.route('/logout').get(isLoggedIn, logout);
