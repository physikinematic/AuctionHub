import { Link, useLocation } from 'react-router-dom';

import { Grid2, Tab, Tabs, Typography, useTheme } from '@mui/material';

import { LogoButton } from '../components';
import React from 'react';

const Sidebar = ({ items, fullLogo, itemAlignment, withLabels, children}) => {
  const location = useLocation();
  const theme = useTheme();

  const isRtL = theme.isRtL;
  const borderDirection = isRtL ? { borderLeft: 3 } : { borderRight: 3 };

  return (
    <Grid2
      container
      direction='column'
      sx={{
        height: '100vh',
        position: 'fixed',
        zIndex: 998,
      }}
      boxShadow='rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px'
      bgcolor='background.paper'
      alignItems='center'
    >
      <Grid2
        item
        container
        maxHeight={fullLogo ? '8vw' : 85}
        maxWidth={fullLogo ? '20vw' : 85}
        height='100%'
        alignItems='center'
        justifyContent='center'
      >
        <LogoButton sx={{width: '40%'}} fullLogo={fullLogo} glowOff />
      </Grid2>

      <Grid2
        item
        container
        alignItems={itemAlignment || 'flex-start'}
        size='grow'
        width='100%'
        minWidth={85}
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

            }}
            TabIndicatorProps={{
              sx: {
                backgroundColor: 'primary.highlight',
                left: 0,
              },
            }}
          >
            {items?.map((item) =>
              <Tab
                label={withLabels && 
                <Typography fontWeight='bold' fontSize={{xs: '7vw', sm: '2vw', md: '1.6vw', lg: '1vw'}}>
                  {item.label}
                </Typography>}
                key={item.path}
                component={Link}
                to={item.path}
                icon={item.icon && React.cloneElement(item.icon, { sx: { fontSize: {xs: '7vw', sm: '3vw', md: '2vw', lg: '1.4vw'} } })}
                value={item.path}
                sx={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  height: '10vh',
                  minWidth: '100%',
                  maxHeight: 300,
                }}
              />
            )}
          </Tabs>
          {children}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Sidebar;