import { Grid2, Paper, Typography } from "@mui/material";
import { AuctionItemCard } from ".";
import { useDown } from "../hooks";

const AuctionItemSection = ({ items, label }) => {
  const smDown = useDown('sm');

  const itemAlignment = smDown ? { justifyContent: 'center', alignItems: 'center' } : {};

  return (
    <Grid2 item container direction='column' sx={{ width: '100%', minHeight: '100%' }}>
      <Paper
        elevation={10}
        sx={{
          minHeight: '100%',
          minWidth: '100%',
          p: { xs: 3, sm: 6 },
          bgcolor: 'background.paper',
          border: 3,
          borderColor: 'primary.main',
          borderRadius: 4
        }}
      >
        <Grid2 item container {...itemAlignment}>
          <Typography color='' sx={{ fontWeight: 'bold', fontSize: { xs: '7vw', sm: '2.5vw' }, mb: 6 }}>
            {label}
          </Typography>
        </Grid2>
        <Grid2 item container size={12} spacing={{ xs: 4, sm: 3 }} {...itemAlignment}>
          {items?.length ? items.map((item) =>
            <AuctionItemCard key={item.id} item={item} />
          ) :
            <Typography color='' sx={{ fontSize: { xs: '5vw', sm: 30 }, mt: '10%' }}>
              No items added yet.
            </Typography>
          }
        </Grid2>
      </Paper>
    </Grid2>
  );
}

export default AuctionItemSection;