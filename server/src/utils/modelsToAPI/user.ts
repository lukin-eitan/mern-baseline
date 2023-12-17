import { User } from '../../API/user/user.js';
import { IUser } from '../../models/userModel.js';

export const usersSchemaToUsersApi = (user: Express.User | IUser): User => {
  const result: User = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    profileImgUrl: user.profileImgUrl
  };
  return result;
};
