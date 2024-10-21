import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import Logo from '../../../static/images/hublogo.png';

const LogoButton = (props) => {
  return (
    <Box 
      component={Link} 
      to='/' 
      sx={{
        display: 'inline-flex', // Use inline-flex to fit content
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 1, // Optional: Add padding for better touch targets
        textDecoration: 'none', // Ensure link styling is correct
        ...props.sx
      }}
    >
      <Box
        component='img'
        src={Logo}
        alt="Logo"
        sx={{
          transition: 'filter 0.3s ease',
          width: '100%',
          height: 'auto',
          ':hover':{
            filter: !props.glowOff && 'drop-shadow(0 0 10px rgba(255, 0, 0, 1))' ,
          }
        }}
      />
    </Box>
  );
}

export default LogoButton;