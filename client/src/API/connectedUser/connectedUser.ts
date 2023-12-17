import { User } from '../user/user.js';

export interface ConnectedUser {
  isConnected: boolean;
  user?: User;
}
