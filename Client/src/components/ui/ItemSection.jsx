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
        minWidth: "100%",
        maxWidth: 0,
        p: { xs: 4, sm: "4vw" },
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      {sections.map((section) => {
        return (
          <>
            {section.label && (
              <>
                <Grid2 item container {...itemAlignment}>
                  <Typography
                    color={section.label.color}
                    sx={{
                      fontWeight: "bold",
                      fontSize: {
                        xs: "5vw",
                        sm: "2.5vw",
                        md: "2vw",
                        xl: "1.5vw",
                      },
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
              </>
            )}
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
