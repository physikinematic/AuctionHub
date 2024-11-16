import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (condition, dependencies, path) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition()) {
      navigate(path);
    }
  }, dependencies);
};
