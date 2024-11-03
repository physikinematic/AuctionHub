import { Link } from 'react-router-dom';

import { Grid2 } from '@mui/material';

import Logo from '../../static/images/hublogo.png';

const LogoButton = ({glowOff, sx}) => {
  return (
    <Grid2 
      component={Link} 
      to='/' 
      sx={{
        alignItems: 'center', 
        justifyContent: 'center',
        textDecoration: 'none',
        ...sx
      }}
    >
      <Grid2
        component='img'
        src={Logo}
        alt="Logo"
        sx={{
          transition: 'filter 0.3s ease',
          width: '100%',
          height: 'auto',
          mt: 1.5,
          ':hover':{
            filter: !glowOff && 'drop-shadow(0 0 10px rgba(255, 0, 0, 1))' ,
          }
        }}
      />
    </Grid2>
  );
}

export default LogoButton;