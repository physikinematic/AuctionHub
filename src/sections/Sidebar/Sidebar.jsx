import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { Avatar, Box, Divider, Menu, Tab, Tabs, IconButton, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import Logo from '../../static/images/hublogo-low.png';

const navItems = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/auctions', label: 'Auctions', icon: <LocalOfferIcon /> },
  { path: '/bids', label: 'Bids', icon: <CardMembershipIcon /> },
  { path: '/payment', label: 'Payment', icon: <PaymentIcon /> },
  { path: '/help', label: 'Help', icon: <HelpOutlineIcon /> },
  { path: '/about', label: 'About', icon: <InfoIcon /> },
  { path: '/contact', label: 'Contact', icon: <MailOutlineIcon /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const logged = true;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link to='/'>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 3 }}>
                <Box component='img' src={Logo} alt="Logo" sx={{ width: '60%', height: 'auto' }} />
              </Box>
            </Link>
          </Box>

          <Divider sx={{ width: '80%', borderColor: 'black' }} variant="middle" />

          <Tabs
            value={location.pathname}
            orientation="vertical"
            sx={{
              flexGrow: 1,
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
              mt: 2,
            }}
            TabIndicatorProps={{
              sx: {
                left: 0,
              },
            }}
          >
            {navItems.map((item) => (
              <Tab
                key={item.path}
                component={Link}
                to={item.path}
                icon={item.icon}
                value={item.path}
                sx={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  minHeight: 60,
                  height: 'auto',
                }}
              />
            ))}
          </Tabs>

          <Divider sx={{ width: '80%', mt: 2 }} variant="middle" />

          <IconButton onClick={handleMenuOpen} sx={{ m: 2 }}>
            <Avatar alt="User Avatar" src="" sx={{ width: 30, height: 30 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box>
              {(logged ? (<>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem> 
              </>) : <MenuItem onClick={handleMenuClose}>Sign in</MenuItem>)}
            </Box>
          </Menu>
        </Box>

        <Divider orientation="vertical" sx={{ height: '98%' }} flexItem variant='middle' />
      </Box>
    </>
  );
};

export default Sidebar;