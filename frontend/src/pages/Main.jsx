import { Route, Routes, Link, useNavigate } from "react-router-dom";

import { Grid2, Hidden, Typography, Button, useMediaQuery } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { Header, Sidebar } from "../sections";
import { ProfileMenuButton, Searchbar } from "../components";
import { useAccount } from "../contexts";
import { useUp } from "../hooks";

const Main = ({ items }) => {
  const { isAuthenticated } = useAccount();
  const navigate = useNavigate();
  const smUp = useUp('sm');
  const tooSmall = useMediaQuery('only screen and (max-width: 434px)');

  const drawerItems = items.map(item => {
    return { ...item, onClick: () => { navigate(item.path); } }
  });

  const signinDrawerItems = !isAuthenticated() ?
    [{ path: '/signin', label: 'Sign In', icon: <AccountBoxIcon />, onClick: () => { navigate('/signin'); } }]
    : [];

  return (
    <Grid2 container direction='row' sx={{ height: '100vh' }}>
      <Grid2 item >
        <Hidden smDown>
          <Sidebar 
          withLabels 
          items={items}
          top='80px' 
          />
        </Hidden>
      </Grid2>
      <Grid2 item container direction="column" size='grow'>
        <Header drawerLists={[drawerItems, signinDrawerItems]}>
          <Grid2 item container size='grow' sx={{ height: '100%', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            {!tooSmall &&
              <Grid2 item container size={{ xs: 'grow', sm: 'auto' }}>
                <Searchbar size={smUp ? 'medium' : 'small'} sx={{ width: '100%' }} />
              </Grid2>}
            {isAuthenticated() &&
              <Grid2
                item
                container
                size={tooSmall ? 'grow' : 'auto'}
                alignItems='center'
                justifyContent='flex-end'
              >
                <ProfileMenuButton
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }} />
              </Grid2>}
            {!isAuthenticated() &&
              <Grid2 item container size={tooSmall && 'grow'} justifyContent='flex-end'>
                <Button component={Link} to={'/signin'} sx={{ height: [smUp ? 55 : 36] }}>
                  <Typography fontSize={tooSmall ? '3vw' : {xs: '3vw', sm: '2vw', md: '1.5vw', lg: '1vw'}} fontWeight='bold'>{'Sign in'}</Typography>
                </Button>
              </Grid2>
            }
          </Grid2>
        </Header>
        <Grid2
          item
          container
          sx={{
            m: { xs: '10%', sm: 10 },
            mt: { xs: 15, sm: 17, md: 17 },
            marginInlineStart: { xs: '10%', sm: 20 },
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 'auto',
          }}
          justifyContent='center'
          alignItems='center'
        >
          <Routes>
            {items.map((item) => {
              return <Route path={item.path} element={item.element} />
            })}
          </Routes>
        </Grid2>
      </Grid2>
    </Grid2 >
  );
}

export default Main;