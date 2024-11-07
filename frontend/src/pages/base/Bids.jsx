import { AuctionItemSection } from "../../components";
import { useAccount, useAuctions } from "../../contexts";
import { useRedirect } from "../../hooks";

const Bids = () => {
  const { bidAuctions } = useAuctions();
  const { isAuthenticated } = useAccount();

  useRedirect(() => !isAuthenticated(), [isAuthenticated], '/');

  return (
    <AuctionItemSection items={bidAuctions} label={'My Bids'} type={{bid: true}} />
  );
}

export default Bids;