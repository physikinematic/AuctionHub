import { Link, Route, Routes, useNavigate } from "react-router-dom";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button, Grid2, Hidden, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { ProfileMenuButton, Searchbar } from "../components";
import { useAccount } from "../contexts";
import { useUp } from "../hooks";
import { Header, Sidebar } from "../sections";

const Main = ({ items }) => {
  const { isAuthenticated, account } = useAccount();
  const [signedIn, setSignedIn] = useState(isAuthenticated());
  const navigate = useNavigate();
  const smUp = useUp("sm");
  const mdUp = useUp("md");

  useEffect(() => {
    setSignedIn(isAuthenticated());
  }, [account]);

  const drawerItems = items.map((item) => {
    return {
      ...item,
      onClick: () => {
        navigate(item.path);
      },
    };
  });

  const signinDrawerItems = !signedIn
    ? [
        {
          path: "/signin",
          label: "Sign In",
          icon: <AccountBoxIcon />,
          onClick: () => {
            navigate("/signin");
          },
        },
      ]
    : [];

  return (
    <Grid2 container direction="row" sx={{ height: "100vh" }}>
      <Grid2 item>
        <Hidden smDown>
          <Sidebar withLabels items={items} />
        </Hidden>
      </Grid2>
      <Grid2 item container direction="column" size="grow">
        <Header drawerLists={[drawerItems, signinDrawerItems]}>
          <Grid2
            item
            container
            size="grow"
            sx={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {smUp && (
              <Grid2 item container justifyContent="flex-start" size="grow">
                <Searchbar
                  size={mdUp ? "medium" : "small"}
                  sx={{ width: "50%" }}
                />
              </Grid2>
            )}
            {signedIn && (
              <Grid2
                item
                container
                maxHeight="100%"
                size="grow"
                alignItems="center"
                justifyContent="flex-end"
              >
                <ProfileMenuButton
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                />
              </Grid2>
            )}
            {!signedIn && (
              <Grid2 item container size="grow" justifyContent="flex-end">
                <Button size="large" component={Link} to={"/signin"}>
                  <Typography
                    fontSize={{
                      xs: 13,
                      sm: 15,
                      md: "2vw",
                      lg: "1.5vw",
                      xl: "1.2vw",
                    }}
                    fontWeight="bold"
                  >
                    Sign in
                  </Typography>
                </Button>
              </Grid2>
            )}
          </Grid2>
        </Header>
        <Grid2
          item
          container
          sx={{
            m: { xs: "10%", sm: 10 },
            mt: { xs: 15, sm: 17, md: 17 },
            marginInlineStart: { xs: "10%", sm: 20 },
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: "auto",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Routes>
            {items.map((item) => {
              return <Route path={item.path} element={item.element} />;
            })}
          </Routes>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default Main;
