import { useNavigate } from "react-router-dom";
import { AuctionItemSection } from "../components";
import { useAccount, useAuctions } from "../contexts";
import { useEffect } from "react";

const Auctions = () => {
  const { ownedAuctions } = useAuctions();
  const {isAuthenticated} = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <AuctionItemSection items={ownedAuctions} label={'My Auctions'} />
  );
}

export default Auctions;