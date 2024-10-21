import React from 'react';
import { Link, LogoButton, RegistrationForm } from '../../components/index';

import { Box, Typography } from '@mui/material';

const Register = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <RegistrationForm
        label='Sign Up'
        fields={[
          { label: 'First Name', required: true, type: 'text' },
          { label: 'Last Name', required: true, type: 'text' },
          { label: 'Email', required: true, type: 'email' },
          { label: 'Password', required: true, type: 'password' },
        ]}
        sx={{ width: '50%', height: '100%' }}
        formStyle={{ width: '60%' }}
        submit={{
          label: 'Register',
          onClick: (e) => { console.log(e); }
        }}
      >
        <Typography sx={{ marginTop: 2 }}>
          Already have an accout? <Link to="/login">Log in here</Link>
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

export default Register;