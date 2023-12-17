import { QueryClient, useQuery } from '@tanstack/react-query';
import { checkAuthentication } from '../apiCalls/authApi';
import { ConnectedUser } from '../../API/connectedUser/connectedUser';

const checkAuthenticationQuery = () => ({
  queryKey: ['checkAuthentication'],
  queryFn: async () => checkAuthentication()
});

export const useCheckAuthenticationQuery = (
  initialData: ConnectedUser | undefined
) => {
  const query = checkAuthenticationQuery();
  return useQuery({
    ...query,
    staleTime: 60000,
    initialData: initialData
  });
};

export const checkAuthenticationLoader = (queryClient: QueryClient) => {
  return async () => {
    const query = checkAuthenticationQuery();
    return queryClient.ensureQueryData({ ...query, staleTime: 60000 }); // return data if available or fetch it
  };
};

export const checkAuthenticationInvalidator = (queryClient: QueryClient) => {
  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['checkAuthentication']
    });
  };
  invalidate();
};
