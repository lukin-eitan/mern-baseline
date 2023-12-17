import { useConnectedUser } from '../../hooks/useConnectedUser';

const Home = () => {
  const connectedUser = useConnectedUser();
  return (
    <div>
      {connectedUser?.isConnected
        ? 'Hello ' + connectedUser.user?.firstName
        : 'Hello Guest!'}
      !
    </div>
  );
};

export default Home;
