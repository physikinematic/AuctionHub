import { Grid2, Typography } from "@mui/material";
import { AuctionItemCard, AuctionItemCardSkeleton, ItemSection } from ".";

const AuctionItemSection = ({ items, label }) => {
  return (
    <Grid2
      item
      container
      direction="column"
      sx={{ width: "100%", minHeight: "100%" }}
    >
      <ItemSection
        sections={[
          {
            label: {
              text: label,
            },
            content: !items ? (
              <Grid2 item container size={12} spacing={{ xs: 4, sm: 3 }} pb={2}>
                {Array.from({ length: 4 }, (_, i) => (
                  <AuctionItemCardSkeleton key={i} />
                ))}
              </Grid2>
            ) : items.length ? (
              <Grid2 item container size={12} spacing={{ xs: 4, sm: 3 }} pb={2}>
                {items?.length ? (
                  items.map((item) => (
                    <AuctionItemCard key={item.id} item={item} />
                  ))
                ) : (
                  <Typography
                    color=""
                    sx={{ fontSize: { xs: "5vw", sm: 30 }, mt: "10%" }}
                  >
                    No items added yet.
                  </Typography>
                )}
              </Grid2>
            ) : (
              <Typography
                color=""
                sx={{ fontSize: { xs: "5vw", sm: 30 }, mt: "10%" }}
              >
                No items added yet.
              </Typography>
            ),
          },
        ]}
      ></ItemSection>
    </Grid2>
  );
};

export default AuctionItemSection;
