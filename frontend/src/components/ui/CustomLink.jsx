import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const CustomLink = (props) => {
  return (
    <MuiLink component={RouterLink} {...props}>
      {props.children}
    </MuiLink>
  );
};

export default CustomLink;
