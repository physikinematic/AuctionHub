import { Link, useNavigate } from "react-router-dom";

import { Typography, Button, Grid2 } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { DrawerButton, LogoButton, ProfileMenuButton, Searchbar } from "../components";
import { useAccount } from "../contexts";
import { useNavItems, useUp } from "../hooks";

const Header = () => {
  const { isAuthenticated } = useAccount();
  const navItems = useNavItems(isAuthenticated);
  const navigate = useNavigate();
  const smUp = useUp('sm');

  const drawerItems = navItems.map(item => {
    return { ...item, onClick: () => { navigate(item.path); } }
  });

  const signinDrawerItems = isAuthenticated() ?
    [{ path: '/profile', label: 'Profile', icon: <AccountBoxIcon />, onClick: () => { navigate('/profile'); } }]
    : [{ path: '/signin', label: 'Sign In', icon: <AccountBoxIcon />, onClick: () => { navigate('/signin'); } }];

  const borders = smUp ? { borderBottom: 3, borderColor: 'primary.main', } : { borderBottom: 3, borderColor: 'primary.main', px: 2 };

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
        px: 3.5,
        py: 1.6,
        ...borders
      }}>

      {!smUp &&
        <Grid2 sx={{ maxWidth: 35 }} alignItems='center' justifyContent='center'>
          <LogoButton glowOff />
        </Grid2>
      }

      <Grid2 item container size='grow' sx={{ height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}>
        {!smUp &&
          <Grid2 item container size='auto'>
            <DrawerButton lists={[drawerItems, signinDrawerItems]} />
          </Grid2>
        }
        <Grid2 item container size={{ xs: 'grow', sm: 'auto' }}>
          <Searchbar size={smUp ? 'medium' : 'small'} sx={{ width: '100%' }} />
        </Grid2>
        {!isAuthenticated() && smUp &&
          <Grid2 item container size='auto'>
            <Button component={Link} to={'/signin'} sx={{ height: [smUp ? 55 : 'auto'] }}>
              <Typography sx={{ fontWeight: 'bold' }}>{'Sign in'}</Typography>
            </Button>
          </Grid2>
        }
        {isAuthenticated() && !smUp &&
          <Grid2 item container size='auto'>
            <ProfileMenuButton
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }} />
          </Grid2>
        }
      </Grid2>
    </Grid2>
  );
};

export default Header;