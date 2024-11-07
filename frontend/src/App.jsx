import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { blue, brown, common, grey, red } from "@mui/material/colors";

import { Main, Settings, Separate } from './pages';
import { AccountProvider } from "./contexts";
import { AuctionsProvider } from "./contexts/";
import { useNavItems } from "./hooks";

const Layout = () => {
  const location = useLocation();
  const {main, separate, settings} = useNavItems();
  
  if (main.some(item => item.path === location.pathname)) {
    return <Main items={main}/>;
  }
  
  if (settings.some(item => item.path === location.pathname)) {
    return <Settings items={settings}/>;
  }

  return <Separate items={separate}/>;
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
        default: common.white,
        paper: grey[200],
      },
      border: {
        lightGrey: grey[400],
        grey: grey[700],
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
      MuiPaper: {
        defaultProps: {
          elevation: 0
        }
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