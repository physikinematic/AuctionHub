import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount } from "../../contexts";
import { useAuctions, useRedirect } from "../../hooks";

const Bids = () => {
  const { getBidded } = useAuctions();
  const [auctions, setAuctions] = useState([]);
  const { isAuthenticated, account } = useAccount();

  useRedirect(() => !isAuthenticated(), [isAuthenticated], "/");

  useEffect(() => {
    const fetchAuctions = async () => {
      const auctions = await getBidded(1, 20);
      setAuctions(auctions);
    };
    fetchAuctions();
  }, [account]);

  return <AuctionItemSection items={auctions} label={"My Bids"} />;
};

export default Bids;
