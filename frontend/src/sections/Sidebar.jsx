import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Grid2, Tab, Tabs, Typography } from "@mui/material";

const Sidebar = ({
  items,
  withLabels,
  width,
  tabMaxHeight = 1000,
  tabDivider,
  children,
}) => {
  const location = useLocation();

  const top = { xs: 60, sm: "10.2vw", md: "8.2vw", lg: "6.2vw", xl: "5.2vw" };

  return (
    <Grid2
      container
      direction="column"
      top={top}
      sx={{
        height: {
          xs: `calc(100vh - ${top.xs})`,
          sm: `calc(100vh - ${top.sm})`,
          md: `calc(100vh - ${top.md})`,
          lg: `calc(100vh - ${top.lg})`,
          lg: `calc(100vh - ${top.xl})`,
        },
        position: "fixed",
        zIndex: 998,
      }}
      boxShadow="rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
      bgcolor="background.paper"
      alignItems="center"
    >
      <Tabs
        value={location.pathname}
        orientation="vertical"
        variant="scrollable"
        sx={{
          width: width || "100%",
          height: "100%",
          "& .MuiTabs-flexContainer": {
            height: "100%",
            width: "100%",
            flexGrow: 1,
          },
        }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "primary.highlight",
            left: 0,
          },
        }}
      >
        {items?.map((item) => (
          <Tab
            label={
              withLabels && (
                <Typography
                  fontWeight="bold"
                  fontSize={{ xs: "7vw", sm: "2vw", md: "1.6vw", lg: "1vw" }}
                >
                  {item.label}
                </Typography>
              )
            }
            key={item.path}
            component={Link}
            to={item.path}
            icon={
              item.icon &&
              React.cloneElement(item.icon, {
                sx: {
                  fontSize: { xs: "7vw", sm: "3vw", md: "2vw", lg: "1.4vw" },
                },
              })
            }
            value={item.path}
            sx={{
              flexGrow: 1,
              maxHeight: tabMaxHeight,
              minWidth: "100%",
              textTransform: "none",
              borderBottom: tabDivider && "1px solid #ccc",
            }}
          />
        ))}
      </Tabs>
      {children}
    </Grid2>
  );
};

export default Sidebar;
