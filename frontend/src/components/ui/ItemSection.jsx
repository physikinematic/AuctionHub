import { Divider, Grid2, Paper, Typography } from "@mui/material";
import { useDown } from "../../hooks";

const ItemSection = ({ sections = [] }) => {
  const smDown = useDown('sm');

  const itemAlignment = smDown ? { justifyContent: 'center', alignItems: 'center' } : {};

  return (
    <Paper
      sx={{
        minHeight: '100%',
        minWidth: '100%',
        p: { xs: 3, sm: 6 },
        bgcolor: 'background.paper',
        border: 3,
        borderColor: 'border.grey',
        borderRadius: 4,
        mb: 10
      }}
    >
      {sections.map(section => {
        return (
          <>
            <Grid2 item container {...itemAlignment}>
              <Typography color={section.label.color} sx={{ fontWeight: 'bold', fontSize: { xs: '7vw', sm: '2.5vw', md: '1.5vw' }, mb: 4 }}>
                {section.label.text}
              </Typography>
            </Grid2>
            <Grid2 component={Divider} item border={1} borderColor='border.lightGrey' borderRadius={1} mb={6} />
            <Grid2 item container {...itemAlignment}>
              {section.content}
            </Grid2>
          </>
        )
      })}

    </Paper>
  )
}

export default ItemSection;