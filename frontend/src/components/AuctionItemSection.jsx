import { Grid2, Typography } from "@mui/material";
import { AuctionItemCard, AuctionItemCardSkeleton, ItemSection } from ".";

const AuctionItemSection = ({ items, customEmptyText, label }) => {
  let components;
  const fontSize = { xs: "3vw", sm: "1.2vw" };

  switch (items) {
    case null:
    case undefined:
      if (!customEmptyText) {
        components = Array.from({ length: 4 }, (_, i) => (
          <AuctionItemCardSkeleton key={i} />
        ));
      } else {
        components = (
          <Typography sx={{ fontSize: fontSize, mt: "10%" }}>
            {customEmptyText}
          </Typography>
        );
      }
      break;
    default:
      if (!items.length) {
        components = (
          <Typography sx={{ fontSize: fontSize, mt: "10%" }}>
            No items added yet.
          </Typography>
        );
      } else {
        components = items.map((item) => (
          <AuctionItemCard key={item.id} item={item} />
        ));
      }
  }

  return (
    <ItemSection
      sections={[
        {
          label: {
            text: label,
          },
          content: (
            <Grid2 item container size="grow" spacing={{ xs: 4, sm: 3 }} pb={2}>
              {components}
            </Grid2>
          ),
        },
      ]}
    />
  );
};

export default AuctionItemSection;
