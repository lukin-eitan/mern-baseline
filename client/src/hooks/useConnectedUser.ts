import { useLoaderData } from 'react-router-dom';
import {
  checkAuthenticationLoader,
  useCheckAuthenticationQuery
} from '../utils/apiQueries/authQueries';

export const useConnectedUser = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof checkAuthenticationLoader>>
  >;

  const { data } = useCheckAuthenticationQuery(initialData);
  return data;
};
