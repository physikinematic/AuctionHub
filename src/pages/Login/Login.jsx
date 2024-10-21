import React from 'react';
import { Link, LogoButton, RegistrationForm } from '../../components/index';

import { Typography, Box } from '@mui/material';

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <RegistrationForm
        label='Login'
        fields={[
          { label: 'Email', required: true, type: 'email' },
          { label: 'Password', required: true, type: 'password' },
        ]}
        sx={{ width: '50%', height: '100%' }}
        formStyle={{ width: '60%' }}
        submit={{
          label: 'Login',
          onClick: (e) => { console.log(e); }
        }}
      >
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </RegistrationForm>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection='column'
        sx={{ width: '50%', height: '100%', backgroundColor: 'black' }}
      >
        <LogoButton sx={{ width: '20%' }} />
      </Box>
    </Box>
  );
};

export default Login;