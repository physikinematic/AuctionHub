import { Grid2, Skeleton } from "@mui/material";
import ItemCard from "./ui/ItemCard";

const AuctionItemCardSkeleton = () => {
  return (
    <Grid2 item container size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
      <ItemCard
        contents={
          <Grid2
            container
            spacing={0.5}
            alignItems="center"
            justifyContent="center"
            height={{
              xs: "80vw",
              sm: "50vw",
              md: "32vw",
              lg: "29vw",
              xl: "21vw",
            }}
          >
            <Skeleton variant="rectangular" width="90%" height="45%" />
            <Skeleton variant="text" width="90%" height="2.5%" />
            <Skeleton variant="text" width="90%" height="2.5%" />
            <Skeleton variant="rectangular" width="21.5%" height="10%" />
            <Skeleton variant="rectangular" width="21.5%" height="10%" />
            <Skeleton variant="rectangular" width="21.5%" height="10%" />
            <Skeleton variant="rectangular" width="21.5%" height="10%" />
            <Skeleton variant="rectangular" width="90%" height="10%" />
          </Grid2>
        }
      />
    </Grid2>
  );
};

export default AuctionItemCardSkeleton;
