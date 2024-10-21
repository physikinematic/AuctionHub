import { Box, Button, TextField, Typography } from "@mui/material";

const Form = (props) => {
  return (
    <Box {...props.sx}>
      {props.fields.map((field) => {
        return <TextField
          label={field.label}
          variant="outlined"
          type={field.type}
          fullWidth
          sx={{ marginBottom: 2 }}
          required={field.required}
        />
      })}
      <Button onClick={props.submit.onClick} variant="contained" color="primary" fullWidth>
        <Typography color='white'>
          {props.submit.label}
        </Typography>
      </Button>
      {props.children}
    </Box>
  )
}

export default Form;