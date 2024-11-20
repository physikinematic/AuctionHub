import { Button, Grid2 } from "@mui/material";

const ActionButton = ({ label, size, color, onClick, sx }) => {
  return (
    <Grid2 item size={size || "grow"}>
      <Button
        disableElevation
        color={color}
        variant="contained"
        onClick={onClick}
        sx={{
          width: "100%",
          color: "common.white",
          "&:hover": {
            color: "common.white",
          },
          ...sx,
        }}
      >
        {label}
      </Button>
    </Grid2>
  );
};

export default ActionButton;
