import { Divider, Grid2, Paper, Typography } from "@mui/material";
import { useDown } from "../../hooks";

const ItemSection = ({ sections = [] }) => {
  const smDown = useDown("sm");

  const itemAlignment = smDown
    ? { justifyContent: "center", alignItems: "center" }
    : {};

  return (
    <Paper
      sx={{
        minHeight: "100%",
        minWidth: "100%",
        p: { xs: 4, sm: 6 },
        bgcolor: "background.paper",
        borderRadius: 4,
        mb: 10,
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      {sections.map((section) => {
        return (
          <>
            <Grid2 item container {...itemAlignment}>
              <Typography
                color={section.label.color}
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "6vw", sm: "3vw", md: "2.5vw", xl: "2vw" },
                  mb: 4,
                }}
              >
                {section.label.text}
              </Typography>
            </Grid2>
            <Grid2
              component={Divider}
              item
              border={1}
              borderColor="border.lightGrey"
              borderRadius={1}
              mb={6}
            />
            <Grid2 item container {...itemAlignment}>
              {section.content}
            </Grid2>
          </>
        );
      })}
    </Paper>
  );
};

export default ItemSection;
