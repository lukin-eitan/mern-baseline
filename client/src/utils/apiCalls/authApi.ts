import axios from 'axios';
import { LogInUser } from '../../API/user/loginUser';
import { ConnectedUser } from '../../API/connectedUser/connectedUser';

export const loginUser = async (user: LogInUser | null): Promise<void> => {
  await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
    user,
    { withCredentials: true } // send cookies
  );
};

export const logoutUser = async (): Promise<void> => {
  await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`,
    { withCredentials: true } // send cookies
  );
};

export const checkAuthentication = async (): Promise<
  ConnectedUser | undefined
> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/check-auth`,
    { withCredentials: true } // send cookies
  );
  return data as ConnectedUser;
};
