import { Link } from "react-router-dom";
import { Toolbar, Typography, Button, Box, IconButton, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const buttons = { 'Sign in': '/login' };

  return (
    <Box sx={{ position: 'relative' }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
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
        />
        {Object.entries(buttons).map(([label, path]) => (
          <Button key={path} component={Link} to={path} sx={{ marginInlineStart: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
          </Button>
        ))}
      </Toolbar>
    </Box>
  );
};

export default Header;