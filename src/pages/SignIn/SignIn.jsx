import React, { useState } from 'react';

import { Typography } from '@mui/material';

import { CustomLink, RegistrationForm } from '../../components/index';

const SignIn = () => {
  const signInFields = {
    label: 'Sign In',
    fields: [
      { label: 'Email', required: true, type: 'email' },
      { label: 'Password', required: true, type: 'password' },
    ],
    submit: {
      label: 'Submit',
      onClick: () => { },
    },
    altText: {
      text: "Don't have an account?",
      linkText: 'Register here',
      onClick: () => { setTargetFields(signUpFields) },
    }
  };

  const signUpFields = {
    label: 'Sign Up',
    fields: [
      { label: 'First Name', required: true, type: 'text' },
      { label: 'Last Name', required: true, type: 'text' },
      { label: 'Email', required: true, type: 'email' },
      { label: 'Password', required: true, type: 'password' },
    ],
    submit: {
      label: 'Submit',
      onClick: () => { },
    },
    altText: {
      text: "Already have an account?",
      linkText: 'Login here',
      onClick: () => { setTargetFields(signInFields) },
    }
  };

  const [targetLayout, setTargetFields] = useState(signInFields);
  
  return (
    <RegistrationForm
      label={targetLayout.label}
      fields={targetLayout.fields}
      sx={{ width: { xs: '100%', sm: '50%' }, height: '100%' }}
      form_sx={{ width: { xs: '70%', sm: '60%' } }}
      submit={{
        label: targetLayout.submit.label,
        onClick: targetLayout.submit.onClick
      }}
      includeLogo
    >
      <Typography variant="body2" sx={{ marginTop: 2, }}>
        {targetLayout.altText.text} <CustomLink onClick={targetLayout.altText.onClick}>{targetLayout.altText.linkText}</CustomLink>
      </Typography>
    </RegistrationForm>
  );
};

export default SignIn;