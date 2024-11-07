import { AuctionItemSection } from "../../components";
import { useAccount, useAuctions } from "../../contexts";
import { useRedirect } from "../../hooks";

const Auctions = () => {
  const { ownedAuctions } = useAuctions();
  const { isAuthenticated } = useAccount();
  
  useRedirect(() => !isAuthenticated(), [isAuthenticated], '/');

  return (
    <AuctionItemSection items={ownedAuctions} label={'My Auctions'} type={{owned: true}} />
  );
}

export default Auctions;