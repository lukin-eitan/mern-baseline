import axios from 'axios';
import { RegisterUser } from '../../API/user/registerUser';
import { API_BASE_URL } from '../../config/config';

export const registerUser = async (
  user: RegisterUser | null
): Promise<void> => {
  if (user) {
    await axios.post(
      `${API_BASE_URL}/api/v1/users/register`,
      user,
      { withCredentials: true } // send cookies
    );
  }
};
