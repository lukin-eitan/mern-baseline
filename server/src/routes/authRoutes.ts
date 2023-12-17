import express from 'express';
import { checkauth, login, logout } from '../controllers/authController.js';
import { isLoggedIn } from '../middleware/authenticationMiddleware.js';
import passport from 'passport';

export const router = express.Router();

router.route('/check-auth').get(checkauth);
router.route('/login').post(passport.authenticate('local'), login);
router.route('/logout').get(isLoggedIn, logout);
