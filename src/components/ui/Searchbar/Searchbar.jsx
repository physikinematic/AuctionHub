import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const Searchbar = (props) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="button" aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
      InputProps={{ sx: { hieght: 200 } }}
    />
  )
}

export default Searchbar;