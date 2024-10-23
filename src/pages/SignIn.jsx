import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { CustomLink, RegistrationForm } from '../components/index';

const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  text: /^[a-zA-Z]+$/
};

const layouts = {
  signin: {
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
    }
  },
  signup: {
    label: 'Sign Up',
    fields: [
      { label: 'First Name', required: true, type: 'text', size: 6 },
      { label: 'Last Name', required: true, type: 'text', size: 6 },
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
    }
  }
};

const SignIn = () => {
  const [targetLayout, setTargetLayout] = useState(layouts.signin);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    let isValid = false;
    if (regex[name]) {
      isValid = regex[name].test(value);
    }

    setFormErrors({ ...formErrors, [name]: !isValid });
  };

  const resetFields = () => {
    setFormErrors({});
    setFormValues({});
  }

  const resetLayout = label => {
    resetFields();
    setTargetLayout(label);
  }

  const altTextEvents = {
    'Sign In': () => { resetLayout(layouts.signup) },
    'Sign Up': () => { resetLayout(layouts.signin) },
  };

  const updatedFields = targetLayout.fields.map((field) => ({
    ...field,
    onBlur: handleInputChange,
    error: formErrors[field.label.toLowerCase()],
    helperText: formErrors[field.label.toLowerCase()] ? `${field.label} is invalid` : '',
    name: field.label.toLowerCase(),
  }));

  return (
    <RegistrationForm
      label={targetLayout.label}
      fields={updatedFields}
      form_sx={{ width: { xs: '70%', sm: '60%' } }}
      sx={{ bgcolor: 'background.default', height: '100%' }}
      submit={{
        label: targetLayout.submit.label,
        onClick: targetLayout.submit.onClick
      }}
      includeLogo
    >
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        {targetLayout.altText.text} <CustomLink onClick={altTextEvents[targetLayout.label]}>{targetLayout.altText.linkText}</CustomLink>
      </Typography>
    </RegistrationForm>
  );
};

export default SignIn;