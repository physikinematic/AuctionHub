import { Grid2, Typography } from "@mui/material";
import { Form, LogoButton } from "./";


const RegistrationForm = ({ fields, submit, label, includeLogo, children }) => {
  const logoButton = size => {
    return (
      <Grid2
        item
        container
        justifyContent='center'
        alignItems='center'
        size={size}
      >
        <LogoButton sx={{ width: '20%' }} />
      </Grid2>)
  };

  const renderLogo = size => {
    return includeLogo ? logoButton(size) : <></>;
  };

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
        size='grow'
        sx={{ bgcolor: 'background.default', height: '100%' }}
      >
        {renderLogo({ xs: 12, sm: 0 })}
        <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '8vw', sm: '3vw' }, m: 6 }}>
          {[label]}
        </Typography>
        <Grid2 item sx={{ width: { xs: '70%', sm: '60%' } }}>
          <Form fields={fields} submit={submit}>
            {children}
          </Form>
        </Grid2>
      </Grid2>
      {renderLogo({ xs: 0, sm: 6 })}
    </Grid2 >
  )
}

export default RegistrationForm;