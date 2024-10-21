import React from 'react';
import { Grid2, Typography, TextField, Button, Box, Link } from '@mui/material';
import Logo from '../../static/images/hublogo-high.png';

const Login = () => {
  return (
    <Box>
      <Box sx={{width: '50%', bgcolor: 'black', alignItems: 'flex-start'}}>
        <Box component='img' src={Logo} alt="Logo" sx={{ width: '40%' }} />
        <Typography variant="h1" color='white' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Auction Hub
        </Typography>
        <Typography color='white' variant="h3" sx={{ textAlign: 'center' }}>
          Where Deals Meet Destiny
        </Typography>
      </Box>
      <Box sx={{width: '50%', alignItems: 'flex-end'}}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          required
        />
        <Button variant="contained" color="primary" fullWidth>
          <Typography color='white'>
            Login
          </Typography>
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Box>
    </Box>
    // <Grid2 container sx={{ height: '100vh' }}>
    //   <Grid2 item xs={12} md={6} sx={{ bgcolor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    //     <Box component='img' src={Logo} alt="Logo" sx={{ width: '40%', marginBottom: '20px' }} />
    //     <Typography variant="h1" color='white' sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold' }}>
    //       Auction Hub
    //     </Typography>
    //     <Typography color='white' variant="h3" sx={{ textAlign: 'center', maxWidth: '400px' }}>
    //       Where Deals Meet Destiny
    //     </Typography>
    //   </Grid2>

    //   <Grid2 item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
    //     <Typography variant="h4" sx={{ marginBottom: 2 }}>
    //       Login
    //     </Typography>
    //     <TextField
    //       label="Email"
    //       variant="outlined"
    //       fullWidth
    //       sx={{ marginBottom: 2 }}
    //       required
    //     />
    //     <TextField
    //       label="Password"
    //       type="password"
    //       variant="outlined"
    //       fullWidth
    //       sx={{ marginBottom: 2 }}
    //       required
    //     />
    //     <Button variant="contained" color="primary" fullWidth>
    //       <Typography color='white'>
    //         Login
    //       </Typography>
    //     </Button>
    //     <Typography variant="body2" sx={{ marginTop: 2 }}>
    //       Don't have an account? <Link to="/register">Register here</Link>
    //     </Typography>
    //   </Grid2>
    // </Grid2>
  );
};

export default Login;