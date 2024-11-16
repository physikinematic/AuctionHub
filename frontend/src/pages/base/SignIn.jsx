import React, { useEffect, useState } from "react";
import { Autocomplete, Typography } from "@mui/material";
import { CustomLink, RegistrationForm } from "../../components";
import { useAccount } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useRedirect } from "../../hooks";

const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
  firstName: /^[a-zA-Z]+$/,
  lastName: /^[a-zA-Z]+$/,
};

const layouts = {
  signin: {
    label: "Sign In",
    fields: [
      {
        name: "email",
        label: "Email",
        required: true,
        type: "email",
        validate: true,
      },
      { name: "password", label: "Password", required: true, type: "password" },
    ],
    altText: {
      text: "Don't have an account?",
      linkText: "Register here",
    },
  },
  signup: {
    label: "Sign Up",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        required: true,
        type: "text",
        validate: true,
        size: 6,
      },
      {
        name: "lastName",
        label: "Last Name",
        required: true,
        type: "text",
        validate: true,
        size: 6,
      },
      {
        name: "email",
        label: "Email",
        required: true,
        type: "text",
        validate: true,
      },
      {
        name: "password",
        label: "Password",
        required: true,
        type: "password",
        validate: true,
        autocomplete: false,
      },
    ],
    altText: {
      text: "Already have an account?",
      linkText: "Login here",
    },
  },
};

const SignIn = () => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [updatedLayouts, setUpdatedLayouts] = useState({});
  const [targetLayout, setTargetLayout] = useState(layouts.signin);
  const { isAuthenticated, signin, signup, user } = useAccount();
  const navigate = useNavigate();

  useRedirect(
    () => {
      const auth = isAuthenticated();
      return auth;
    },
    [user],
    "/"
  );

  const altTextEvents = {
    "Sign In": () => setTargetLayout(updatedLayouts.signup),
    "Sign Up": () => setTargetLayout(updatedLayouts.signin),
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
    let message = "";
    switch (field.label) {
      case "Password":
        message = `${field.label} shall be between 8 and 16 characters, and contain at least one capital letter, one small letter, and one special character.`;
        break;
      default:
        message = `${field.label} is not valid.`;
        break;
    }
    return message;
  };

  const validateInput = () => {
    const noEmptyFields = Object.values(formValues).every((value) => value);
    const noErrors = Object.values(formErrors).every((error) => !error);

    return noEmptyFields && noErrors;
  };

  const handlSubmit = async (action) => {
    let success;

    if (validateInput())
      switch (action) {
        case "Sign In":
          success = !!(await signin({
            email: formValues["email"],
            password: formValues["password"],
          }));
          break;
        case "Sign Up":
          success = !!(await signup({
            firstName: formValues["firstName"],
            lastName: formValues["lastName"],
            email: formValues["email"],
            password: formValues["password"],
          }));
          break;
      }

    if (success) navigate("/");
  };

  useEffect(() => {
    const newLayout = Object.fromEntries(
      Object.entries(layouts).map(([key, layout]) => {
        layout.fields.forEach((field) => {
          Object.assign(field, {
            onChange: handleInputChange,
            error: field.validate && formErrors[field.name],
            helperText:
              field.validate && formErrors[field.name]
                ? handleInputErrorMessage(field)
                : "",
            value: formValues[field.name],
          });
        });
        return [key, layout];
      })
    );
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
        label: "Submit",
        onClick: () => handlSubmit(targetLayout.label),
      }}
      includeLogo
    >
      <Typography
        width="100%"
        align="center"
        sx={{ marginTop: 2, fontSize: { xs: "3vw", sm: "0.8vw" } }}
      >
        {targetLayout.altText.text}{" "}
        <CustomLink onClick={altTextEvents[targetLayout.label]}>
          {targetLayout.altText.linkText}
        </CustomLink>
      </Typography>
    </RegistrationForm>
  );
};

export default SignIn;
