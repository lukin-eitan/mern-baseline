import passport from 'passport';
import express from 'express';
import { User } from '../models/userModel.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import mongoSanitize from 'express-mongo-sanitize';
import { config, logger } from '../index.js';

const initPassportAndSessions = (app: express.Application) => {
  app.use(mongoSanitize());

  const mongoStore = MongoStore.create({
    mongoUrl: config.mongoURI,
    crypto: {
      // encrypt session data
      secret: config.sessionStoreSecret
    }
  });

  app.use(
    session({
      secret: config.sessionSecret, // session secret
      resave: false, // Do not force the session to be saved back to the session store
      saveUninitialized: true, // False is useful for implementing login sessions, where you want to only start a session when a user is actually logged in.
      rolling: true, // Resets the cookie's expiration time to the maxAge on every request (session will never expire as long as the user is using the session at least once every "maxAge" time).
      name: 'sessionId', // Name of the cookie
      cookie: {
        httpOnly: true, // cannot access session cookie though js
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        secure: config.nodeEnv === 'production' // true requires https connection and requires deployment to have certificates
      },
      store: mongoStore
    })
  );

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser(User.serializeUser() as any);
  passport.deserializeUser(User.deserializeUser());

  logger.info('passport and sessions loaded');
};

export default initPassportAndSessions;
