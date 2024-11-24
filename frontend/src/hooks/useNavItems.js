import CardMembershipIcon from "@mui/icons-material/CardMembership";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InfoIcon from "@mui/icons-material/Info";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StoreIcon from "@mui/icons-material/Store";

import {
  About,
  Auctions,
  Bids,
  Help,
  Home,
  Legal,
  Payment,
  PrivacyPolicy,
  Profile,
  SignIn,
  Store,
  Support,
} from "../pages";

const navItems = () => ({
  main: [
    {
      path: "/store",
      label: "Store",
      icon: <StoreIcon />,
      element: <Store />,
    },
    {
      path: "/auctions",
      label: "Auctions",
      icon: <LocalOfferIcon />,
      element: <Auctions />,
    },
    {
      path: "/bids",
      label: "Bids",
      icon: <CardMembershipIcon />,
      element: <Bids />,
    },
  ],
  settings: [
    {
      path: "/profile",
      label: "Profile",
      element: <Profile />,
    },
    {
      path: "/payment",
      label: "Payment",
      element: <Payment />,
    },
  ],
  separate: [
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/legal",
      element: <Legal />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
  ],
  welcome: [
    {
      path: "/",
      label: "Home",
      element: <Home />,
      icon: <PlayCircleOutlineIcon />,
    },
    {
      path: "/store",
      label: "Store",
      icon: <StoreIcon />,
    },
    {
      path: "/help",
      label: "Help",
      icon: <HelpOutlineIcon />,
      element: <Help />,
    },
    {
      path: "/about",
      label: "About Us",
      icon: <InfoIcon />,
      element: <About />,
    },
    {
      path: "/support",
      label: "Support",
      icon: <LocalPhoneIcon />,
      element: <Support />,
    },
  ],
});

export const useNavItems = () => {
  const nav = navItems();

  return {
    main: nav.main,
    separate: nav.separate,
    settings: nav.settings,
    welcome: nav.welcome,
  };
};
