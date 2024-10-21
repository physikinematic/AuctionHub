import { Link } from "react-router-dom";

import { Toolbar, Typography, Button, Box, IconButton, TextField, InputAdornment } from "@mui/material";

import { Searchbar } from "../../components/index";

const Header = () => {
  const buttons = { 'Sign in': '/login' };

  return (
    <Box sx={{ position: 'relative' }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Searchbar size='small' sx={{ width: {sm: '70%', md: '20%'} }} />
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