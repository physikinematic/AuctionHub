import { Grid2 } from "@mui/material";

import { DrawerButton, LogoButton } from "../components";
import { useUp } from "../hooks";

const Header = ({ drawerLists, children, fullLogo }) => {
  const smUp = useUp("sm");

  return (
    <Grid2
      container
      spacing={{ xs: 4, sm: 2 }}
      sx={{
        position: "fixed",
        zIndex: 999,
        top: 0,
        width: "100%",
        height: "auto",
        bgcolor: "background.paper",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: "7vw", sm: "4.3vw", md: "3.3vw", lg: "2vw" },
        py: 1.6,
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px",
      }}
    >
      <Grid2
        container
        width={fullLogo ? { xs: "20vw", sm: "9.6vw" } : 40}
        height={fullLogo ? { xs: "6vw", sm: "3vw" } : 40}
        alignItems="center"
        justifyContent="center"
      >
        <LogoButton fullLogo={fullLogo} glowOff />
      </Grid2>
      {children}
      {!smUp && (
        <Grid2 item container justifyContent="flex-end" size="grow">
          <DrawerButton lists={drawerLists} />
        </Grid2>
      )}
    </Grid2>
  );
};

export default Header;
