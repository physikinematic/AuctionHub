import { Button, Grid2, TextField, Typography } from "@mui/material";

const Form = ({ fields, submit, children }) => {
  return (
    <Grid2 container spacing={4}>
      {fields.map((field, index) => {
        return (
          <Grid2 key={field.label + index} item container size={field.size || 12}>
            <TextField
              key={index}
              variant="outlined"
              fullWidth
              sx={{ fontSize: { xs: '2.5vw', sm: '1.2vw', md: '0.8vw' } }}
              label={field.label}
              value={field.value || ''}
              type={field.type}
              required={field.required}
              error={field.error}
              helperText={field.helperText}
              name={field.name}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onKeyDown={(event) => {if (event.key === 'Enter') submit.onClick(event)}}
            />
          </Grid2>)
      })}
      <Button sx={{ fontSize: { xs: '3vw', sm: '1vw' } }} onClick={submit.onClick} variant="contained" color="primary" fullWidth>
        <Typography color='white'>
          {submit.label}
        </Typography>
      </Button>
      {children}
    </Grid2>
  )
}

export default Form;