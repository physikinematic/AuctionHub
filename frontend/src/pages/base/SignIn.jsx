import React, { useEffect, useState } from 'react';
import { Autocomplete, Typography } from '@mui/material';
import { CustomLink, RegistrationForm } from '../../components';
import { useAccount } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { useRedirect } from '../../hooks';

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
      { label: 'Email', required: true, type: 'email', validate: true },
      { label: 'Password', required: true, type: 'password' },
    ],
    altText: {
      text: "Don't have an account?",
      linkText: 'Register here',
    }
  },
  signup: {
    label: 'Sign Up',
    fields: [
      { label: 'First Name', required: true, type: 'text', validate: true, size: 6 },
      { label: 'Last Name', required: true, type: 'text', validate: true, size: 6 },
      { label: 'Email', required: true, type: 'text', validate: true },
      { label: 'Password', required: true, type: 'password', validate: true, autocomplete: false },
    ],
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
  const { isAuthenticated, signin, signup, user } = useAccount();
  const navigate = useNavigate();

  useRedirect(() => {
    const auth = isAuthenticated();
    return auth;
  }, [user], '/');

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
    switch (field.label) {
      case 'Password':
        message = `${field.label} shall be a minimum of 8 characters, and contain at least one capital letter, one small letter, and one symbol.`;
        break;
      default:
        message = `${field.label} is not valid.`;
        break;
    }
    return message;
  }

  const validateInput = () => {
    const noEmptyFields = Object.values(formValues).every(value => value);
    const noErrors = Object.values(formErrors).every(error => !error);

    return noEmptyFields && noErrors;
  };

  const handlSubmit = async (action) => {
    let success;

    if (validateInput())
      switch (action) {
        case 'Sign In':
          success = !! await signin({ 'email': formValues['email'], 'password': formValues['password'] });
          break;
        case 'Sign Up':
          success = !! await signup({
            'first name': formValues['first name'],
            'last name': formValues['last name'],
            'email': formValues['email'],
            'password': formValues['password'],
          });
          break;
      }

      if (success) navigate('/');
  };

  useEffect(() => {
    const newLayout = Object.fromEntries(
      Object.entries(layouts).map(([key, layout]) => {
        layout.fields.forEach(field => {
          Object.assign(field, {
            onChange: handleInputChange,
            error: field.validate && formErrors[field.label.toLowerCase()],
            helperText: field.validate && formErrors[field.label.toLowerCase()] ? handleInputErrorMessage(field) : '',
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
        label: 'Submit',
        onClick: () => handlSubmit(targetLayout.label)
      }}
      includeLogo
    >
      <Typography width='100%' align='center' sx={{ marginTop: 2, fontSize: { xs: '3vw', sm: '0.8vw' } }}>
        {targetLayout.altText.text} <CustomLink onClick={altTextEvents[targetLayout.label]}>{targetLayout.altText.linkText}</CustomLink>
      </Typography>
    </RegistrationForm>
  );
};

export default SignIn;