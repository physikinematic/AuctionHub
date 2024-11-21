import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
} from "@mui/material";
import React from "react";

export const DialogType = Object.freeze({
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  INFO: "info",
});

const dialogConfig = {
  [DialogType.SUCCESS]: {
    icon: <CheckCircleIcon sx={{ fontSize: { xs: "6vw", sm: "2.5vw" } }} />,
    iconColor: "green",
    titleColor: "green",
  },
  [DialogType.WARNING]: {
    icon: <WarningAmberIcon sx={{ fontSize: { xs: "6vw", sm: "2.5vw" } }} />,
    iconColor: "orange",
    titleColor: "orange",
  },
  [DialogType.ERROR]: {
    icon: <ErrorIcon sx={{ fontSize: { xs: "6vw", sm: "2.5vw" } }} />,
    iconColor: "red",
    titleColor: "red",
  },
  [DialogType.INFO]: {
    icon: <InfoIcon sx={{ fontSize: { xs: "6vw", sm: "2.5vw" } }} />,
    iconColor: "blue",
    titleColor: "blue",
  },
};

const DialogBox = ({
  open,
  setOpen,
  title,
  content,
  actions,
  type = DialogType.INFO,
}) => {
  const { icon, iconColor, titleColor } = dialogConfig[type] || {};

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "20vw",
          minHeight: "10vw",
        },
      }}
    >
      <DialogTitle>
        <Grid2
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          {icon && <Grid2 color={iconColor}>{icon}</Grid2>}
          <Typography
            fontWeight="bold"
            fontSize={{ xs: "3.5vw", sm: "1.2vw" }}
            color={titleColor}
          >
            {title}
          </Typography>
        </Grid2>
      </DialogTitle>
      <DialogContent>
        <Grid2 container justifyContent="center">
          {content}
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Grid2 container size="grow" justifyContent="center" pb={1} spacing={2}>
          {actions.map((action) => (
            <Button
              sx={{
                fontSize: { xs: "2.5vw", sm: "1vw" },
                minWidth: "1vw",
              }}
              onClick={action.onClick}
            >
              {action.text}
            </Button>
          ))}
        </Grid2>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
