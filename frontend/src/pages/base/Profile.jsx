import { useAccount } from "../../contexts";
import { useRedirect } from "../../hooks";

const Profile = () => {
  const { isAuthenticated } = useAccount();

  useRedirect(() => !isAuthenticated(), [isAuthenticated], "/store");

  return <></>;
};

export default Profile;
