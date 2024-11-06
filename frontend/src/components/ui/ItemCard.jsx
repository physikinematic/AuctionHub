import { Card, CardActions, CardContent, Grid2 } from "@mui/material";

const ItemCard = ({ contents, actions }) => {
  return (
    <Card sx={{ width: '100%', border: 3, borderRadius: 3, borderColor: 'border.grey', p: 1 }}>
      <CardContent>
        {contents}
      </CardContent>
      {!!actions &&
        <CardActions>
          {actions}
        </CardActions>
      }
    </Card>
  )
}

export default ItemCard;