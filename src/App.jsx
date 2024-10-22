import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider, Grid2, Hidden } from "@mui/material";
import { brown, grey, red } from "@mui/material/colors";

import './App.css';

import { Sidebar, Header } from './sections/index';
import { About, AddAuction, Contact, Help, Home, Auctions, Bids, Payment, SignIn, Legal, PrivacyPolicy } from './pages/index';

const Layout = () => {
  const location = useLocation();

  const separatePages = ['/signin', '/register', '/legal', '/privacy-policy'];

  if (separatePages.includes(location.pathname)) {
    return (
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/legal' element={<Legal />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
    );
  }

  return (
    <Grid2 container direction='row' sx={{ height: '100vh', bgcolor: 'background.default' }}>
      <Grid2 item size={{ xs: 0, sm: 'auto' }}>
        <Hidden smDown>
          <Sidebar />
        </Hidden>
      </Grid2>
      <Grid2 item direction="column" size='grow' container>
        <Grid2 item sx={{ height: '10%' }}>
          <Header />
        </Grid2>
        <Grid2 item sx={{ height: '90%' }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/add-auction' element={<AddAuction />} />
            <Route path='/auctions' element={<Auctions />} />
            <Route path='/bids' element={<Bids />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/help' element={<Help />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: red[600],
      },
      background: {
        default: brown[50]
      }
    },
    typography: {
      fontFamily: 'Montserrat'
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            color: grey[700],
            borderColor: grey[700],
            '&:hover': {
              borderColor: red[500],
              color: red[500]
            },
            fontWeight: 'bold',
            textTransform: 'none',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'typography.fontFamily',
            fontSize: { xs: '2vw', sm: '1vw' }
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: grey[500],
              },
              '&:hover fieldset': {
                borderColor: red[800],
              },
              '&.Mui-focused fieldset': {
                borderColor: grey[500],
              },
            },
            '& .MuiInputLabel-root': {
              color: grey[400],
              fontSize: { xs: '2vw', sm: '1vw' },
              '&.Mui-focused': {
                color: grey[500],
              },
            },
          },
        },
      },
      MuiTouchRipple: {
        styleOverrides: {
          root: {
            color: red[800],
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.5rem',
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: grey[700]
          },
        },
      }
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Router>
  );
};

export default App;