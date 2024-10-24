import { Link, useNavigate } from "react-router-dom";

import { Typography, Button, Grid2, Hidden, useMediaQuery } from "@mui/material";

import { ButtonDrawer, Searchbar } from "../components";
import { navItems } from './Sidebar';
import { useMediaQueryShort } from "../hooks";

const Header = () => {
  const buttons = { 'Sign in': '/signin' };
  const isMediumDevice = useMediaQueryShort().md;
  const size = isMediumDevice ? 'medium' : 'small';

  const navigate = useNavigate();
  const drawerItems = navItems.map(item => {
    return {...item, onClick: () => { navigate(item.path); }}
  });

  return (
    <Grid2 container spacing={2} sx={{ m: 2.5 }}>
      <Grid2 item container size='auto'>
        <Hidden mdUp>
          <ButtonDrawer lists={[drawerItems]} />
        </Hidden>
      </Grid2>
      <Grid2 item container size='grow'>
        <Searchbar size={size} sx={{ width: '100%' }} />
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