import { useAccount } from "../../contexts";
import { useRedirect } from "../../hooks";

const Payment = () => {
  const { isAuthenticated } = useAccount();
  
  useRedirect(() => !isAuthenticated(), [isAuthenticated], '/');
  
  return (
    <>
    </>
  );
}

export default Payment;