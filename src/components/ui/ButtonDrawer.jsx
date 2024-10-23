import { useState } from "react";

import { Button, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ListIcon from '@mui/icons-material/List';

const ButtonDrawer = ({ label, includeIcon = true, lists = [],  button_sx, sx }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Grid2 role="presentation" onClick={toggleDrawer(false)}>
      {lists.map((list, index) =>
        <>
          <List>
            {list.items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {index < list.length && <Divider />}
        </>)
      }
    </Grid2>
  );

  return (
    <>
      <Button { ...button_sx} onClick={toggleDrawer(true)}>
        {includeIcon && <ListIcon/>}
        {label && <Typography sx={{ fontWeight: 'bold', marginInlineStart: 1 }}>{label}</Typography>}
      </Button>
      <Drawer {...sx} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default ButtonDrawer;