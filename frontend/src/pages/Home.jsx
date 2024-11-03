import { AuctionItemSection } from "../components";
import { useAuctions } from "../contexts";

const Home = () => {
  const { auctions } = useAuctions();
  return (
    <AuctionItemSection items={auctions} label='Recommended' />
  );
}

export default Home;