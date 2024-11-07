import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Grid2, Hidden } from '@mui/material';

import { Header, Sidebar } from '../sections';

const Settings = ({ items }) => {
  return (
    <Grid2 container direction='row' sx={{ height: '100vh' }}>
      <Grid2 item >
        <Hidden smDown>
          <Sidebar fullLogo withLabels itemAlignment='flex-start' items={items} />
        </Hidden>
      </Grid2>
      <Grid2 item container direction="column" size='grow'>
        <Header />
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

export default Settings;