import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { CustomLink, RegistrationForm } from '../components';

const regex = {
  'email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'password': /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  'first name': /^[a-zA-Z]+$/,
  'last name': /^[a-zA-Z]+$/
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
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [updatedLayouts, setUpdatedLayouts] = useState({});
  const [targetLayout, setTargetLayout] = useState(layouts.signin);

  const altTextEvents = {
    'Sign In': () => setTargetLayout(updatedLayouts.signup),
    'Sign Up': () => setTargetLayout(updatedLayouts.signin),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    let isValid = false;
    if (regex[name]) {
      isValid = !value || regex[name].test(value);
    }

    setFormErrors({ ...formErrors, [name]: !isValid });
  };

  const handleInputErrorMessage = (field) => {
    let message = '';
    switch (field.type) {
      case 'password':
        message = `${field.label} shall be a minimum of 8 characters, and contain at least one capital letter, one small letter, and one symbol.`;
        break;
      default:
        message = `${field.label} is not valid.`;
        break;
    }
    return message;
  }

  useEffect(() => {
    const newLayout = Object.fromEntries(
      Object.entries(layouts).map(([key, layout]) => {
        console.log('called');
        layout.fields.forEach(field => {
          Object.assign(field, {
            onChange: handleInputChange,
            error: formErrors[field.label.toLowerCase()],
            helperText: formErrors[field.label.toLowerCase()] ? handleInputErrorMessage(field) : '',
            name: field.label.toLowerCase(),
            value: formValues[field.label.toLowerCase()]
          });
        });
        return [key, layout];
      }));
    setUpdatedLayouts(newLayout);
  }, [formErrors, formValues]);


  useEffect(() => {
    setFormValues({});
    setFormErrors({});
  }, [targetLayout]);

  return (
    <RegistrationForm
      label={targetLayout.label}
      fields={targetLayout.fields}
      submit={{
        label: targetLayout.submit.label,
        onClick: targetLayout.submit.onClick
      }}
      includeLogo
    >
      <Typography sx={{ marginTop: 2 }}>
        {targetLayout.altText.text} <CustomLink onClick={altTextEvents[targetLayout.label]}>{targetLayout.altText.linkText}</CustomLink>
      </Typography>
    </RegistrationForm>
  );
};

export default SignIn;