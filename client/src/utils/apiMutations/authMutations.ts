import { LogInUser } from '../../API/user/loginUser';
import { loginUser, logoutUser } from '../apiCalls/authApi';

export const loginUserMutationFn = (user: LogInUser) => loginUser(user);

export const logoutUserMutationFn = () => logoutUser();
