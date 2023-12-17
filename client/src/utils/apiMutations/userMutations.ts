import { RegisterUser } from '../../API/user/registerUser';
import { registerUser } from '../apiCalls/userApi';

export const registerUserMutationFn = (user: RegisterUser | null) =>
  registerUser(user);
