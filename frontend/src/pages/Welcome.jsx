import { Route, Routes, useNavigate } from "react-router-dom";

import { Grid2, Typography } from "@mui/material";

import { CustomLink, ProfileMenuButton } from "../components";
import { useUp } from "../hooks";
import { Header } from "../sections";

const Welcome = ({ items }) => {
  const navigate = useNavigate();
  const mdUp = useUp("md");

  const drawerItems = items
    ?.filter((item) => item.label)
    .map((item) => ({
      ...item,
      onClick: () => {
        navigate(item.path);
      },
    }));

  return (
    <Grid2 container direction="row" minHeight="100vh">
      <Grid2 item container size="grow">
        <Header drawerLists={[drawerItems]} maxScreenForDrawer="md">
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
            <Grid2
              item
              container
              maxHeight="100%"
              size="grow"
              alignItems="center"
              justifyContent="flex-end"
            >
              {mdUp &&
                drawerItems?.map((item) => (
                  <CustomLink
                    underline="none"
                    key={item.label}
                    to={item.path}
                    onClick={item.onClick}
                  >
                    <Typography fontSize="1vw">{item.label}</Typography>
                  </CustomLink>
                ))}
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
          </Grid2>
        </Header>
        <Grid2
          item
          container
          justifyContent="center"
          m={{ xs: 4, sm: 3, md: 8 }}
          mt={{ xs: 15, sm: 17, md: 17 }}
          flexGrow={1}
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

export default Welcome;
