import { Navigate, Outlet } from 'react-router-dom';
import { useConnectedUser } from '../../hooks/useConnectedUser';

const PrivateRoutes = () => {
  const connectedUser = useConnectedUser();
  return connectedUser?.isConnected ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default PrivateRoutes;
