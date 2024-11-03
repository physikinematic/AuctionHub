import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const Searchbar = (props) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size={props.size}
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
    />
  )
}

export default Searchbar;