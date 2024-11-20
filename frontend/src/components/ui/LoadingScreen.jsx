import { Grid2, Typography } from "@mui/material";

const LoadingScreen = ({ text = "Loading" }) => {
  return (
    <Grid2
      container
      position="fixed"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      minWidth="100vw"
      direction="column"
      bgcolor="background.loading"
      zIndex={9999}
    >
      <Grid2
        sx={{
          width: "60px",
          height: `calc(0.866 * 60px)`,
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
      <Typography>{text}</Typography>
    </Grid2>
  );
};

export default LoadingScreen;
