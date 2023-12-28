import { QueryClient, useMutation } from '@tanstack/react-query';
import { RegisterUser } from '../../API/user/registerUser';
import { registerUser } from '../apiCalls/userApi';
import { checkAuthenticationInvalidator } from '../apiQueries/authQueries';
import { DGError } from '../../API/dgError/dgError';
import { AxiosError } from 'axios';

const registerUserMutationFn = (user: RegisterUser | null) =>
  registerUser(user);

export const useRegisterUserMutation = (
  queryClient: QueryClient,
  handleFailedSignUp: (errData: DGError) => void
) =>
  useMutation({
    mutationFn: registerUserMutationFn,
    onSuccess: () => checkAuthenticationInvalidator(queryClient),
    onError: (err: AxiosError) => {
      if (err.response?.data) {
        const data = err.response.data as DGError;
        handleFailedSignUp(data);
      } else {
        handleFailedSignUp({ name: err.name, message: err.message } as DGError);
      }
    }
  });
