import { Card, CardActions, CardContent, Grid2 } from "@mui/material";

const ItemCard = ({ contents, actions }) => {
  return (
    <Card
      sx={{
        width: "100%",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px -2px 2px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
        p: 1,
      }}
    >
      <CardContent>{contents}</CardContent>
      {!!actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default ItemCard;
