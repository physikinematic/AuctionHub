import { useMediaQuery, useTheme } from "@mui/material";

export const useDown = (size) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(size));
};

export const useUp = (size) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(size));
};

export const useOnly = (size) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.only(size));
};

export const useBetween = (start, end) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between(start, end));
};
