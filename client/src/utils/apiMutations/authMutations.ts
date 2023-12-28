import { QueryClient, useMutation } from '@tanstack/react-query';
import { LogInUser } from '../../API/user/loginUser';
import { loginUser, logoutUser } from '../apiCalls/authApi';
import { checkAuthenticationInvalidator } from '../apiQueries/authQueries';
import { AxiosError } from 'axios';

export const loginUserMutationFn = (user: LogInUser) => loginUser(user);

export const useLoginUserMutation = (
  queryClient: QueryClient,
  handleFailedLogIn: (isClientError: boolean) => void
) =>
  useMutation({
    mutationFn: loginUserMutationFn,
    onSuccess: () => checkAuthenticationInvalidator(queryClient),
    onError: (err: AxiosError) => {
      const isClientError = err.response?.status
        ? err.response.status < 500 && err.response.status >= 400
        : false;
      handleFailedLogIn(isClientError);
    }
  });

export const logoutUserMutationFn = () => logoutUser();
