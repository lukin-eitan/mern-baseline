import { useConnectedUser } from '../../hooks/useConnectedUser';

const Profile = () => {
  const connectedUser = useConnectedUser();

  return (
    <div>Hello {connectedUser?.user?.firstName}. Welcome to your Profile!</div>
  );
};

export default Profile;
