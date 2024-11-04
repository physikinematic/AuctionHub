import { useNavigate } from "react-router-dom";
import { AuctionItemSection } from "../components";
import { useAccount, useAuctions } from "../contexts";
import { useEffect } from "react";

const Bids = () => {
  const { bidAuctions } = useAuctions();
  const { isAuthenticated } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <AuctionItemSection items={bidAuctions} label={'My Bids'} />
  );
}

export default Bids;