import { Grid2, Typography } from "@mui/material";
import { ItemSection } from "../../components";

const Help = () => {
  const text = ({ t, size, weight, br }) => {
    return (
      <>
        <Typography
          fontSize={size || { xs: "3vw", sm: "1vw" }}
          fontWeight={weight || "normal"}
        >
          {t}
        </Typography>
        {br && [...Array(br)].map((_, i) => <br key={i} />)}
      </>
    );
  };

  return (
    <ItemSection
      sections={[
        {
          label: {
            text: "General Help",
            color: "primary.main",
          },
          content: (
            <Grid2 pb={10}>
              {text({
                t: "Welcome to the Auction Hub Help Center. Here you can find answers to frequently asked questions and guidance on using our platform.",
                br: 2,
              })}
              {text({
                t: "1. Getting Started",
                weight: "bold",
                br: 1,
                size: { xs: "3.5vw", sm: "1.1vw" },
              })}
              {text({
                t: "To get started with Auction Hub, you need to create an account and log in. Once logged in, you can start browsing items, place bids, and manage your account.",
                br: 3,
              })}
              {text({
                t: "2. How to Place a Bid",
                weight: "bold",
                br: 1,
                size: { xs: "3.5vw", sm: "1.1vw" },
              })}
              {text({
                t: "Find an item you are interested in, set your bid amount, and submit your bid. Make sure to check the auction end time and ensure your bid is placed before it closes.",
              })}
            </Grid2>
          ),
        },
        {
          label: {
            text: "Troubleshooting",
            color: "primary.main",
          },
          content: (
            <Grid2>
              {text({
                t: "1. Can't Log In",
                weight: "bold",
                br: 1,
                size: { xs: "3.5vw", sm: "1.1vw" },
              })}
              {text({
                t: "If you're having trouble logging in, make sure you are using the correct username and password. If you've forgotten your password, use the \"Forgot Password\" feature to reset it.",
                br: 3,
              })}
              {text({
                t: "2. Bid Not Submitting",
                weight: "bold",
                br: 1,
                size: { xs: "3.5vw", sm: "1.1vw" },
              })}
              {text({
                t: "If your bid is not submitting, check your internet connection and ensure you are meeting all bid requirements. If the problem persists, contact support.",
              })}
            </Grid2>
          ),
        },
      ]}
    ></ItemSection>
  );
};

export default Help;
