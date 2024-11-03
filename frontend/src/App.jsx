import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { createTheme, ThemeProvider, Grid2, Hidden, CssBaseline } from "@mui/material";
import { blue, brown, grey, red } from "@mui/material/colors";

import { Sidebar, Header } from './sections';
import { About, AddAuction, Contact, Help, Home, Auctions, Bids, Payment, SignIn, Legal, PrivacyPolicy } from './pages';
import { AccountProvider } from "./contexts";
import { AuctionsProvider } from "./contexts/";

const Layout = () => {
  const location = useLocation();

  const separatePages = ['/signin', '/payment', '/legal', '/privacy-policy'];

  if (separatePages.includes(location.pathname)) {
    return (
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/legal' element={<Legal />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
    );
  }

  return (
    <Grid2 container direction='row' sx={{ height: '100vh' }}>
      <Grid2 item >
        <Hidden smDown>
          <Sidebar />
        </Hidden>
      </Grid2>
      <Grid2 item container direction="column" size='grow'>
        <Header />
        <Grid2
          item
          container
          sx={{
            m: { xs: '10%', sm: 8 },
            mt: { xs: 15, sm: 17 },
            marginInlineStart: { xs: '10%', sm: 19 },
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 'auto',
          }}
          justifyContent='center'
          alignItems='center'
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path='/add-auction' element={<AddAuction />} />
            <Route path='/auctions' element={<Auctions />} />
            <Route path='/bids' element={<Bids />} />
            <Route path='/help' element={<Help />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </Grid2>
      </Grid2>
    </Grid2 >
  );
};

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: red[600],
        highlight: red[400],
        dim: red[800],
      },
      secondary: {
        main: blue[600],
      },
      background: {
        default: brown[50],
        paper: brown[50],
      }
    },
    typography: {
      fontFamily: 'Montserrat',
      customResponsive: {
        fontSize: '2.5vw',
        '@media (min-width:600px)': {
          fontSize: '1.2vw',
        },
        '@media (min-width:900px)': {
          fontSize: '0.8vw',
        },
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: 'background.default',
            margin: 0,
            padding: 0,
          },
        },
      },
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
      MuiDivider: {
        styleOverrides: {
          root: {
            bgcolor: 'common.black',
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
        <AccountProvider>
          <AuctionsProvider>
            <CssBaseline />
            <Layout />
          </AuctionsProvider>
        </AccountProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;