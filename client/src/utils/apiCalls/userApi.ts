import axios from 'axios';
import { RegisterUser } from '../../API/user/registerUser';

export const registerUser = async (
  user: RegisterUser | null
): Promise<void> => {
  if (user) {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`,
      user,
      { withCredentials: true } // send cookies
    );
  }
};
