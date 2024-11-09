import { useState } from "react";

import { Button, Divider, Drawer, Grid2, Typography } from "@mui/material";
import ListIcon from '@mui/icons-material/List';

const DrawerButton = ({ label, includeIcon = true, lists }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerGrid = (
    <Grid2
      container
      direction='column'
      onClick={toggleDrawer(false)}
      sx={{ height: '100%' }}
    >
      {lists?.map((list, index) => (
        <Grid2 key={index} item container size='grow' sx={{ maxHeight: `${list.length * 12}%` }} direction='column'>
          {list.map((item) => (
            <Grid2 item key={item.label} sx={{ flexGrow: 1 }}>
              <Button
                onClick={item.onClick}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 0,
                  justifyContent: 'flex-start',
                  borderColor: 'transparent'
                }}
              >
                {item.icon}
                <Typography sx={{ paddingInlineStart: 1 }}>{item.label}</Typography>
              </Button>
            </Grid2>
          ))}
          {index < lists.length - 1 && (
            <Grid2 item>
              <Divider sx={{ width: '100%' }} variant='fullWidth' />
            </Grid2>
          )}
        </Grid2>
      ))}
    </Grid2>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        {includeIcon && <ListIcon />}
        {label && <Typography sx={{ fontWeight: 'bold', marginInlineStart: 1 }}>{label}</Typography>}
      </Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { bgcolor: 'background.default', width: '50%' } }}>
        {DrawerGrid}
      </Drawer>
    </>
  );
}

export default DrawerButton;