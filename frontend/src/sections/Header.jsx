import { Grid2 } from "@mui/material";

import { DrawerButton, LogoButton } from "../components";
import { useUp } from "../hooks";

const Header = ({ drawerLists, children }) => {
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
        height: { xs: 60, sm: "10.2vw", md: "8.2vw", lg: "6.2vw", xl: "5.2vw" },
        bgcolor: "background.paper",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: "7vw", sm: "4.3vw", md: "3.3vw", lg: "2vw" },
        py: "0.5vw",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px",
      }}
    >
      {!smUp && (
        <Grid2 item container justifyContent="flex-start" size="grow">
          <DrawerButton
            fontSize={{ xs: "3vw", sm: "2vw", md: "1.5vw", lg: "1vw" }}
            lists={drawerLists}
          />
        </Grid2>
      )}
      <LogoButton
        sx={{
          width: { xs: "7.5vw", sm: "22vw", md: "17vw", lg: "11.5vw" },
          minWidth: 35,
          position: "fixed",
        }}
        fullLogo={smUp}
        glowOff
      />
      {children}
    </Grid2>
  );
};

export default Header;
