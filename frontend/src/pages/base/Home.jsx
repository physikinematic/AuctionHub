import { Button, Grid2, Typography } from "@mui/material";

import { CustomLink, ItemSection } from "../../components";
import { useAccount } from "../../contexts";
import AuctionImage from "../../static/images/auction.png";

const Home = () => {
  const { isAuthenticated } = useAccount();

  return (
    <ItemSection
      sections={[
        {
          content: (
            <Grid2 container>
              <Grid2
                item
                container
                size="grow"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
              >
                <Grid2 item container spacing={2} rowSpacing={4} p="2vw">
                  <Grid2 item fontWeight="bold" size={12}>
                    <Typography
                      fontSize={{ xs: "5vw", sm: "2vw" }}
                      color="primary.main"
                      textAlign={{ xs: "center", sm: "start" }}
                      textTransform="capitalize"
                      fontWeight="medium"
                    >
                      Welcome to AuctionHub
                    </Typography>
                    <Typography
                      fontSize={{ xs: "3vw", sm: "0.9vw" }}
                      textAlign={{ xs: "center", sm: "start" }}
                      textTransform="capitalize"
                      marginInlineStart={{ xs: 0, sm: "21vw" }}
                      fontWeight="medium"
                    >
                      where every bid counts!
                    </Typography>
                  </Grid2>
                  <Grid2
                    item
                    fontSize={{ xs: "3vw", sm: "1vw" }}
                    textAlign={{ xs: "center", sm: "start" }}
                  >
                    Discover the excitement of live auctions and uncover unique
                    treasures at unbeatable prices. Whether you're hunting for
                    rare collectibles, the latest gadgets, or everyday
                    essentials, you're just a bid away from your next great
                    find. Sign up today, start bidding, and experience the
                    thrill of winning! Your journey to amazing deals begins
                    here.
                  </Grid2>
                  <Grid2
                    item
                    container
                    size={12}
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                    alignItems="center"
                  >
                    <CustomLink to="/store">
                      <Button sx={{ fontSize: { xs: "2.5vw", sm: "1vw" } }}>
                        Get Started ➡
                      </Button>
                    </CustomLink>
                    {!isAuthenticated() && (
                      <CustomLink
                        sx={{
                          fontSize: {
                            xs: "3vw",
                            sm: "1vw",
                          },
                          fontWeight: "medium",
                        }}
                        to="/signin"
                      >
                        Signin
                      </CustomLink>
                    )}
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2
                item
                container
                size={{ xs: 0, sm: "grow" }}
                paddingInlineEnd="2vw"
                justifyContent="end"
                alignItems="center"
              >
                <Grid2
                  item
                  component={"img"}
                  src={AuctionImage}
                  borderRadius={8}
                />
              </Grid2>
            </Grid2>
          ),
        },
      ]}
    />
  );
};

export default Home;
