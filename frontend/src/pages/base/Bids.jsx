import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount } from "../../contexts";
import { useAuctions, useRedirect } from "../../hooks";

const Bids = () => {
  const { getBidded } = useAuctions();
  const [auctions, setAuctions] = useState([]);
  const { isAuthenticated, account } = useAccount();

  useRedirect(() => !isAuthenticated(), [isAuthenticated], "/");

  const setup = async () => {
    const auctions = await getBidded(1, 20);
    setAuctions(auctions);
  };

  useEffect(() => {
    setup();
  }, [account]);

  return (
    <AuctionItemSection
      items={auctions}
      label={"My Bids"}
      type={{ bid: true }}
    />
  );
};

export default Bids;
