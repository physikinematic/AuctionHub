import { useAccount } from "../../contexts";
import { useRedirect } from "../../hooks";

const Profile = () => {
  const { isAuthenticated } = useAccount();
  
  useRedirect(() => !isAuthenticated(), [isAuthenticated], '/');
  
  return (
    <></>
  );
}

export default Profile;