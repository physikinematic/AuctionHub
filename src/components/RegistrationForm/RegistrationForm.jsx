import { Box, Typography } from "@mui/material";
import { Form } from "../index";


const RegistrationForm = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection='column'
      {...props.sx}
    >
      <Typography sx={{ fontWeight: 'bold', fontSize: '3vw', m: 6 }}>
        {[props.label]}
      </Typography>
      <Form
        sx={props.formStyle}
        fields={props.fields}
        submit={props.submit}
      >
        {props.children}
      </Form>
    </Box>
  )
}

export default RegistrationForm;