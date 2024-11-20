import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Grid2, Hidden, Typography } from "@mui/material";

import { Header, Sidebar } from "../sections";

const Settings = ({ items }) => {
  const navigate = useNavigate();

  const drawerItems = items.map((item) => {
    return {
      ...item,
      onClick: () => {
        navigate(item.path);
      },
    };
  });

  return (
    <Grid2 container direction="row" sx={{ height: "100vh" }}>
      <Grid2 item>
        <Hidden smDown>
          <Sidebar
            withLabels
            top="calc(3vw + 26px)"
            items={items}
            width={{ sm: "23.3vw", md: "22.3vw", lg: "20vw" }}
            tabMaxHeight={50}
            tabDivider
          />
        </Hidden>
      </Grid2>
      <Grid2 item container direction="column" size="grow">
        <Header fullLogo drawerLists={[drawerItems]}>
          <Grid2
            item
            container
            size="grow"
            justifyContent={{ xs: "flex-end", sm: "flex-start" }}
          >
            <Typography
              color="primary.main"
              fontWeight="bold"
              px={"5.2vw"}
              fontSize={{ xs: "4vw", sm: "3vw", md: "2vw", lg: "1.4vw" }}
            >
              Settings
            </Typography>
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

export default Settings;
