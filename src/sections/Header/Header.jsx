import { Link } from "react-router-dom";

import { Typography, Button, Grid2, Hidden, useMediaQuery } from "@mui/material";

import { ButtonDrawer, Searchbar } from "../../components/index";

const Header = () => {
  const buttons = { 'Sign in': '/signin' };
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 600px)"
  );
  const size = isMediumDevice ? 'medium' : 'small';

  return (
    <Grid2 container spacing={2} sx={{ m: 2.5 }}>
      <Grid2 item container size='auto'>
        <Hidden smUp>
          <ButtonDrawer />
        </Hidden>
      </Grid2>
      <Grid2 item container size='grow'>
        <Searchbar size={size} sx={{ width: { xs: '100%', sm: '100%' } }} />
      </Grid2>
      <Grid2 item container size='auto'>
        {Object.entries(buttons).map(([label, path]) => (
          <Button key={path} component={Link} to={path}>
            <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
          </Button>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default Header;