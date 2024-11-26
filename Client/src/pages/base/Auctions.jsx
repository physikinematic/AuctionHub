import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { AuctionItemSection } from "../../components";
import { useAccount } from "../../contexts";
import { useAuctions } from "../../hooks";

const Auctions = () => {
  const { getOwned } = useAuctions();
  const [auctions, setAuctions] = useState();
  const { isAuthenticated, account } = useAccount();

  useEffect(() => {
    const fetchAuctions = async () => {
      const auctions = await getOwned(1, 20);
      setAuctions(auctions);
    };
    fetchAuctions();
  }, [account]);

  return (
    <Grid2 container size="grow" spacing={2} direction="column">
      <AuctionItemSection
        items={auctions}
        customEmptyText={
          !isAuthenticated() && "You must be signed in to view your auctions."
        }
        label={"My Auctions"}
      />
    </Grid2>
  );
};

export default Auctions;
