import { Button, Grid2 } from "@mui/material";

const ActionButton = ({ label, color, onClick, sx }) => {
  return (
    <Grid2 container size='grow'>
      <Button
        color={color}
        variant='contained'
        size="small"
        onClick={onClick}
        sx={{
          width: '100%',
          color: 'common.white',
          '&:hover': {
            color: 'common.white'
          },
          ...sx
        }}>
        {label}
      </Button>
    </Grid2>
  )
}

export default ActionButton;