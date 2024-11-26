import { Grid2, Typography } from "@mui/material";

const LoadingScreen = ({ text = "Loading..." }) => {
  const shapeSize = { xs: "16vw", sm: "6vw" };

  return (
    <Grid2
      container
      position="fixed"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
      direction="column"
      spacing={5}
      bgcolor="background.loading"
      zIndex={9999}
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      <Grid2
        sx={{
          width: shapeSize,
          height: {
            xs: `calc(0.866 * (${shapeSize.xs}))`,
            sm: `calc(0.866 * (${shapeSize.sm}))`,
          },
          color: "#F40000",
          background: `
          conic-gradient(from 149deg at top, transparent, currentColor 2deg 59deg, transparent 61deg) top,
          conic-gradient(from 149deg at top, transparent, currentColor 2deg 59deg, transparent 61deg) bottom right,
          conic-gradient(from -31deg at bottom, transparent, currentColor 1deg 61deg, transparent 63deg) bottom,
          conic-gradient(from 149deg at top, transparent, currentColor 2deg 59deg, transparent 61deg) bottom left
        `,
          backgroundSize: "50% 50%",
          backgroundRepeat: "no-repeat",
          animation: "sh7 1s infinite",
          transform: "rotate(180deg)",
          "@keyframes sh7": {
            "80%, 100%": {
              backgroundPosition: "bottom right, bottom left, bottom, top",
            },
          },
        }}
      />
      <Typography fontSize={{ xs: "5vw", sm: "1.5vw" }} color="common.white">
        {text}
      </Typography>
    </Grid2>
  );
};

export default LoadingScreen;
