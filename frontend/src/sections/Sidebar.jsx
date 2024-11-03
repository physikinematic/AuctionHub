import { Link, useLocation } from 'react-router-dom';

import { Divider, Grid2, Tab, Tabs, useMediaQuery } from '@mui/material';

import { LogoButton, ProfileMenuButton } from '../components';
import { useNavItems } from '../hooks';
import { useAccount } from '../contexts';
import { useTheme } from '@emotion/react';
import React from 'react';

const Sidebar = () => {
  const { isAuthenticated } = useAccount();
  const navItems = useNavItems(isAuthenticated);
  const location = useLocation();
  const theme = useTheme();

  const isRtL = theme.isRtL;
  const borderDirection = isRtL ? { borderLeft: 3 } : { borderRight: 3 };

  return (
    <Grid2
      sx={{
        height: '100vh',
        position: 'fixed',
        zIndex: 1000,
      }}
      {...borderDirection}
      borderColor='primary.main'
      bgcolor='background.paper'
    >
      <Grid2 container sx={{ maxWidth: 90, maxHeight: 85, width: '100%', height: '100%' }} alignItems='center' justifyContent='center'>
        <LogoButton glowOff sx={{ width: 35 }} />
      </Grid2>

      <Grid2
        item
        container
        alignItems='flex-end'
        height='calc(100% - 85px)'
      >
        <Grid2
          container
          direction='column'
          flexGrow={1}
        >
          <Tabs
            value={location.pathname}
            orientation='vertical'
            sx={{
              flexGrow: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
              mb: '10%'
            }}
            TabIndicatorProps={{
              sx: {
                backgroundColor: 'primary.highlight',
                left: 0,
              },
            }}
          >
            {navItems.map((item) =>
              <Tab
                key={item.path}
                component={Link}
                to={item.path}
                icon={React.cloneElement(item.icon, { sx: { fontSize: 26 } })}
                value={item.path}

                sx={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  height: '11.5vh',
                  minHeight: 70,
                  maxHeight: 90,
                }}
              />
            )}
          </Tabs>

          <Grid2
            item
            container
            sx={{
              height: '11.5vh',
              minHeight: 70,
              maxHeight: 90,
              borderTop: 2,
              borderColor: 'primary.main'
            }}
            alignItems='center'
            justifyContent='center'
          >
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
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Sidebar;