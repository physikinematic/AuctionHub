import { Grid2, Typography } from "@mui/material";
import { Form, LogoButton } from "./";


const RegistrationForm = ({ fields, submit, label, includeLogo, children }) => {
  const logoButton = (size, sx) => {
    return (
      <Grid2
        item
        container
        justifyContent='center'
        alignItems='center'
        size={size}
        sx={sx}
      >
        <LogoButton sx={{ width: { xs: '20%', sm: '25%' } }} />
      </Grid2>
    )
  };

  const renderLogo = (size, sx) => {
    return includeLogo ? logoButton(size, sx) : <></>;
  };

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      minHeight='100vh'
      bgcolor='background.paper'
    >
      <Grid2
        item
        container
        justifyContent="center"
        alignItems="center"
        direction='column'
        size='grow'
        height='100%'
        paddingBottom={{ xs: 0, sm: 4 }}
      >
        {renderLogo({ xs: 12, sm: 0 })}
        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '7vw', sm: '2.8vw' }, m: 6 }}>
          {[label]}
        </Typography>
        <Grid2 item sx={{ width: { xs: '70%', sm: '50%' }}}>
          <Form fields={fields} submit={submit}>
            {children}
          </Form>
        </Grid2>
      </Grid2>
      {renderLogo({ xs: 0, sm: 6 }, { bgcolor: 'common.black', height: '100vh' })}
    </Grid2 >
  )
}

export default RegistrationForm;