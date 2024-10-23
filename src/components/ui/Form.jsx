import { Button, Grid2, TextField, Typography } from "@mui/material";

const Form = ({ fields, submit, sx, children }) => {
  return (
    <Grid2 container spacing={2} {...sx}>
      {fields.map((field, index) => {
        return (
          <Grid2 item container size={field.size || 12}>
            <TextField
              key={index}
              label={field.label}
              variant="outlined"
              type={field.type}
              fullWidth
              required={field.required}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={field.error}
              helperText={field.helperText}
              name={field.name}
            />
          </Grid2>)
      })}
      <Button onClick={submit.onClick} variant="contained" color="primary" fullWidth>
        <Typography color='white'>
          {submit.label}
        </Typography>
      </Button>
      {children}
    </Grid2>
  )
}

export default Form;