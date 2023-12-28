import { QueryClient, useQuery } from '@tanstack/react-query';
import { checkAuthentication } from '../apiCalls/authApi';
import { ConnectedUser } from '../../API/connectedUser/connectedUser';

const checkAuthenticationQuery = () => ({
  queryKey: ['checkAuthentication'],
  queryFn: async () => checkAuthentication(),
  staleTime: 60000
});

export const useCheckAuthenticationQuery = (
  initialData: ConnectedUser | undefined
) => {
  const query = checkAuthenticationQuery();
  return useQuery({
    ...query,
    initialData: initialData
  });
};

export const checkAuthenticationLoader = (queryClient: QueryClient) => {
  return async () => {
    const query = checkAuthenticationQuery();
    return queryClient.ensureQueryData({ ...query }); // return data if available or fetch it
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
