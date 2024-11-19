import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount } from "../../contexts";
import { useAuctions, useRedirect } from "../../hooks";

const Auctions = () => {
  const { getOwned } = useAuctions();
  const [auctions, setAuctions] = useState();
  const { isAuthenticated, account } = useAccount();

  useRedirect(() => !isAuthenticated(), [isAuthenticated], "/");

  const setup = async () => {
    const auctions = await getOwned(1, 20);
    setAuctions(auctions);
  };

  useEffect(() => {
    setup();
  }, [account]);

  return (
    <AuctionItemSection
      items={auctions}
      label={"My Auctions"}
      type={{ owned: true }}
    />
  );
};

export default Auctions;
