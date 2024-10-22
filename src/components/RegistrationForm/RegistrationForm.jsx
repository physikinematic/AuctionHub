import { Box, Hidden, Typography } from "@mui/material";
import { Form, LogoButton } from "../index";


const RegistrationForm = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', bgcolor: 'black' }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection='column'
        sx={{bgcolor: 'white', borderRadius: 45, ...props.sx}}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '8vw', sm: '3vw' }, m: 6 }}>
          {[props.label]}
        </Typography>
        <Form
          sx={props.form_sx}
          fields={props.fields}
          submit={props.submit}
        >
          {props.children}
        </Form>
      </Box>
      <Hidden smDown>
        {props.includeLogo &&
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection='column'
            sx={{ width: '50%', height: '100%' }}
          >
            <LogoButton sx={{ width: '20%' }} />
          </Box>}
      </Hidden>
    </Box >
  )
}

export default RegistrationForm;