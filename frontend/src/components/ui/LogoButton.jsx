import { Link } from "react-router-dom";

import { Grid2 } from "@mui/material";

import Logo from "../../static/images/hublogo.png";
import FullLogo from "../../static/images/hublogo_full.png";

const LogoButton = ({ glowOff, sx, fullLogo, path = "/" }) => {
  return (
    <Grid2
      container
      component={Link}
      to={path}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        maxHeight: "100%",
        maxWidth: "100%",
        ...sx,
      }}
    >
      <Grid2
        item
        component="img"
        src={fullLogo ? FullLogo : Logo}
        alt="Logo"
        sx={{
          transition: "filter 0.3s ease",
          maxHeight: "100%",
          maxWidth: "100%",
          ":hover": {
            filter: !glowOff && "drop-shadow(0 0 10px rgba(255, 0, 0, 1))",
          },
        }}
      />
    </Grid2>
  );
};

export default LogoButton;
