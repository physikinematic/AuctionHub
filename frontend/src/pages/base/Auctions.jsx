import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount, useAuctions } from "../../contexts";
import { useRedirect } from "../../hooks";

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
