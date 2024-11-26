import React, { createContext, useContext, useState } from "react";
import { LoadingScreen } from "../components";

const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (key, isLoading, text = "Loading") => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: isLoading ? text : undefined,
    }));
  };

  const isLoading = Object.values(loadingStates).some(Boolean);

  const loadingText = Object.values(loadingStates).find(Boolean) || "Loading";

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {isLoading && <LoadingScreen text={loadingText} />}
      {children}
    </LoadingContext.Provider>
  );
};
