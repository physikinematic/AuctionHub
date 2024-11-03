import { Card, CardActions, CardContent, Grid2 } from "@mui/material";

const ItemCard = ({ contents, actions }) => {
  return (

    <Card elevation={4} sx={{ width: '100%', border: 1, borderColor: 'primary.main' }}>
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