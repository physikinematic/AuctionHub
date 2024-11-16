import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DialogBox = ({ open, setOpen, title, content, actions }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogBox;
