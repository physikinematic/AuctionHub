import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount } from "../../contexts";
import { useAuctions, useRedirect } from "../../hooks";

const Auctions = () => {
  const { getOwned } = useAuctions();
  const [auctions, setAuctions] = useState();
  const { isAuthenticated, account } = useAccount();

  useRedirect(() => !isAuthenticated(), [isAuthenticated], "/");

  useEffect(() => {
    const fetchAuctions = async () => {
      const auctions = await getOwned(1, 20);
      setAuctions(auctions);
    };
    fetchAuctions();
  }, [account]);

  return <AuctionItemSection items={auctions} label={"My Auctions"} />;
};

export default Auctions;
