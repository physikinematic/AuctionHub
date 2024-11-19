import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAuctions } from "../../hooks";

const Home = () => {
  const { getAll } = useAuctions();
  const [auctions, setAuctions] = useState([]);

  const setup = async () => {
    const auctions = await getAll(1, 20);
    setAuctions(auctions);
  };

  useEffect(() => {
    setup();
  }, []);
  return <AuctionItemSection items={auctions} label="Recommended" />;
};

export default Home;
