import { Grid2 } from "@mui/material";

import { useUp } from "../hooks";
import { DrawerButton, LogoButton } from "../components";

const Header = ({ drawerLists, children, fullLogo }) => {
  const smUp = useUp('sm');

  return (
    <Grid2
      container
      spacing={{ xs: 4, sm: 2 }}
      sx={{
        position: 'fixed',
        zIndex: 999,
        top: 0,
        width: '100%',
        height: 'auto',
        bgcolor: 'background.paper',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3.2,
        py: 1.6,
        boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
      }}>
        <Grid2 sx={{ maxWidth: 35 }} alignItems='center' justifyContent='center'>
          <LogoButton fullLogo={fullLogo} glowOff />
        </Grid2>
      {!smUp &&
        <Grid2 item container size='auto'>
          <DrawerButton lists={drawerLists} />
        </Grid2>
      }
      {children}
    </Grid2>
  );
};

export default Header;