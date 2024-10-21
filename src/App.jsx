import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider, Box, Grid2, Container as MuiContainer } from "@mui/material";
import { deepOrange, grey, red } from "@mui/material/colors";

import './App.css';

import { Sidebar, Header } from './sections/index';
import { About, AddAuction, Contact, Help, Home, Auctions, Bids, Payment, Login, Register, Legal, PrivacyPolicy } from './pages/index';

const Layout = () => {
  const location = useLocation();

  const separatePages = ['/login', '/register', '/legal', '/privacy-policy'];

  if (separatePages.includes(location.pathname)) {
    return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/legal' element={<Legal />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
    );
  }

  return (
    <Grid2 container sx={{ height: '100vh', bgcolor: 'background.default' }}>
      <Grid2 sx={{ width: '5%', height: '100%' }}>
        <Sidebar />
      </Grid2>
      <Grid2 sx={{ width: '95%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Header />
        </Box>
        <MuiContainer sx={{ flex: 1, p: 3 }}>
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
        </MuiContainer>
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
      secondary: {
        main: deepOrange[700],
      },
      background: {
        default: '#f0f0f0',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: { xs: 8, sm: 16 },
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
              backgroundColor: grey[300],
            }
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
          },
        },
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