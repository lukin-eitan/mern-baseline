import { IUser } from '../models/userModel.js';

// Extend the Express.User interface with the IUser interface.
// This allows us to use the IUser interface in the Express.User interface.
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
