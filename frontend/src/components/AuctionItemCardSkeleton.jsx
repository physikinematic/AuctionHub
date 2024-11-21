import { Card, Grid2, Skeleton } from "@mui/material";

const AuctionItemCardSkeleton = () => {
  return (
    <Grid2 item container size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
      <Card
        sx={{
          width: "100%",
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px -2px 2px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
          p: 3,
        }}
      >
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
      </Card>
    </Grid2>
  );
};

export default AuctionItemCardSkeleton;
