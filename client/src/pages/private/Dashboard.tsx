import { useConnectedUser } from '../../hooks/useConnectedUser';

const Dashboard = () => {
  const connectedUser = useConnectedUser();
  return (
    <div>
      Hello {connectedUser?.user?.firstName}. Welcome to your Dashboard!
    </div>
  );
};

export default Dashboard;
