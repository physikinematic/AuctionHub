import { Button, Grid2, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

const MenuButton = ({
  button = <Button>ButtonMenu</Button>,
  menuOptions,
  handleItemClick,
  transformOrigin,
  anchorOrigin,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    handleItemClick(event, index);
    setAnchorEl(null);
  };

  const clonedButton = React.cloneElement(button, { onClick: handleMenuOpen });

  return (
    <Grid2 item container alignItems="center" justifyContent="center">
      {clonedButton}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: anchorOrigin.vertical,
          horizontal: anchorOrigin.horizontal,
        }}
        transformOrigin={{
          vertical: transformOrigin.vertical,
          horizontal: transformOrigin.horizontal,
        }}
      >
        {menuOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Grid2>
  );
};

export default MenuButton;
