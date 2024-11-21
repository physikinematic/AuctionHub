import { Button } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { DialogBox } from "../components";

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
          content={text}
          open={openDialogs[key]}
          setOpen={(open) =>
            setOpenDialogs((prev) => ({ ...prev, [key]: open }))
          }
          actions={
            <Button
              onClick={() =>
                setOpenDialogs((prev) => ({ ...prev, [key]: false }))
              }
            >
              OK
            </Button>
          }
        />
      ))}
      {children}
    </ErrorContext.Provider>
  );
};
