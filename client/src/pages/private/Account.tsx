import { useConnectedUser } from '../../hooks/useConnectedUser';

const Account = () => {
  const connectedUser = useConnectedUser();

  return (
    <div>Hello {connectedUser?.user?.firstName}. Welcome to your Account!</div>
  );
};

export default Account;
