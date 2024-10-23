import { Grid2, Hidden, Typography } from "@mui/material";
import { Form, LogoButton } from "./index";


const RegistrationForm = ({ fields, submit, label, includeLogo, form_sx,  sx, children }) => {
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh', bgcolor: 'common.black' }}
    >
      <Grid2
        item
        container
        justifyContent="center"
        alignItems="center"
        direction='column'
        size={6}
        sx={sx}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '8vw', sm: '3vw' }, m: 6 }}>
          {[label]}
        </Typography>
        <Form
          sx={form_sx}
          fields={fields}
          submit={submit}
        >
          {children}
        </Form>
      </Grid2>
      {includeLogo &&
        <Grid2
          item
          container
          justifyContent='center'
          alignItems='center'
          size='grow'
        >
          <Hidden smDown>
            <LogoButton sx={{ width: '20%' }} />
          </Hidden>
        </Grid2>}
    </Grid2 >
  )
}

export default RegistrationForm;