import { Typography } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { DialogBox } from "../components";
import { DialogType } from "../components/ui/DialogBox";

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [openDialogs, setOpenDialogs] = useState({});

  const setError = (key, text) => {
    setErrors((prev) => ({ ...prev, [key]: text || undefined }));
    setOpenDialogs((prev) => ({ ...prev, [key]: !!text }));
  };

  return (
    <ErrorContext.Provider value={{ setError }}>
      {Object.entries(errors).map(([key, text]) => (
        <DialogBox
          key={key}
          title={key}
          type={DialogType.ERROR}
          content={
            <Typography fontSize={{ xs: "2.5vw", sm: "1vw" }}>
              {text}
            </Typography>
          }
          open={openDialogs[key]}
          setOpen={(open) =>
            setOpenDialogs((prev) => ({ ...prev, [key]: open }))
          }
          actions={[
            {
              onClick: () => {
                setOpenDialogs((prev) => ({ ...prev, [key]: false }));
              },
              text: "OK",
            },
          ]}
        />
      ))}
      {children}
    </ErrorContext.Provider>
  );
};
