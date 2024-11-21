import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount } from "../../contexts";
import { useAuctions } from "../../hooks";

const Home = () => {
  const { account, isAuthenticated } = useAccount();
  const { getNotOwned, getAll } = useAuctions();
  const [auctions, setAuctions] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      const auctions = isAuthenticated()
        ? await getNotOwned(1, 20)
        : await getAll(1, 20);
      setAuctions(auctions);
    };
    fetchAuctions();
  }, [account, isAuthenticated]);
  return <AuctionItemSection items={auctions} label="Recommended" />;
};

export default Home;
