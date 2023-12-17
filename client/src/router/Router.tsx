import { createBrowserRouter } from 'react-router-dom';
import { checkAuthenticationLoader } from '../utils/apiQueries/authQueries';
import { QueryClient } from '@tanstack/react-query';
import ErrorPage from '../pages/public/ErrorPage';
import Home from '../pages/public/Home';
import LogIn from '../pages/public/Login';
import SignUp from '../pages/public/SignUp';
import PrivateRoutes from '../components/routing/PrivateRoutes';
import Account from '../pages/private/Account';
import Profile from '../pages/private/Profile';
import PublicRoutes from '../components/routing/PublicRoutes';
import Dashboard from '../pages/private/Dashboard';
import NavBar from '../components/NavBar';

export const router = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      id: 'root',
      path: '/',
      Component: NavBar,
      errorElement: <ErrorPage />,
      loader: checkAuthenticationLoader(queryClient),
      children: [
        {
          Component: PublicRoutes,
          children: [
            {
              path: '/',
              Component: Home
            },
            {
              path: '/auth/login',
              Component: LogIn
            },
            {
              path: '/auth/signup',
              Component: SignUp
            }
          ]
        },
        {
          Component: PrivateRoutes,
          children: [
            {
              path: '/dashboard',
              Component: Dashboard
            },
            {
              path: '/account',
              Component: Account
            },
            {
              path: '/profile',
              Component: Profile
            }
          ]
        }
      ]
    }
  ]);
};
