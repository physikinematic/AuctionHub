import { useEffect, useState } from "react";
import { useAccount } from "../contexts";
import MenuButton from "./ui/MenuButton";
import { Avatar, Button, Grid2, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DialogBox } from "./";

const menuOptions = {
  loggedIn: ["Profile", "Sign Out"],
  loggedOut: ["Sign In"],
};

const ProfileMenuButton = ({ anchorOrigin, transformOrigin }) => {
  const [targetOptions, setTargetOptions] = useState(menuOptions.loggedOut);
  const { isAuthenticated, signout } = useAccount();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState();

  useEffect(() => {
    setTargetOptions(
      isAuthenticated() ? menuOptions.loggedIn : menuOptions.loggedOut
    );
  }, [isAuthenticated]);

  const handleMenuItemClick = (event, optionName) => {
    switch (optionName) {
      case "Profile":
        navigate("/profile");
        break;
      case "Sign Out":
        setDialogOpen(true);
        break;
      case "Sign In":
        navigate("/signin");
        break;
    }
  };

  const handleSignOut = () => {
    signout();
  };

  return (
    <Grid2 item container alignItems="center" justifyContent="center">
      <MenuButton
        button={
          <IconButton
            sx={{
              minHeight: { xs: 40, sm: 30 },
              minWidth: { xs: 40, sm: 30 },
              width: { xs: "10vw", sm: "6vw", md: "5vw", lg: "3vw" },
              height: { xs: "10vw", sm: "6vw", md: "5vw", lg: "3vw" },
            }}
          >
            <Avatar
              alt="User Avatar"
              src=""
              sx={{ width: "100%", height: "100%" }}
            />
          </IconButton>
        }
        menuOptions={targetOptions}
        handleItemClick={handleMenuItemClick}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      />
      <DialogBox
        title="Confirm Signout"
        open={dialogOpen}
        setOpen={setDialogOpen}
        content={<Typography>Are you sure you want to sign out?</Typography>}
        actions={
          <>
            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                handleSignOut();
              }}
            >
              Yes
            </Button>
          </>
        }
      />
    </Grid2>
  );
};

export default ProfileMenuButton;
