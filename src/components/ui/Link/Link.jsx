import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const Link = (props) => {
  return (
    <RouterLink {...props}>
      <MuiLink>{props.children}</MuiLink>
    </RouterLink>
  )
}

export default Link;