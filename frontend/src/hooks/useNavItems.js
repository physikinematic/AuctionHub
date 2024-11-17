import { useEffect, useState } from "react";

import CardMembershipIcon from "@mui/icons-material/CardMembership";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useAccount } from "../contexts";

import {
  About,
  Auctions,
  Bids,
  Contact,
  Help,
  Home,
  Legal,
  Payment,
  PrivacyPolicy,
  Profile,
  SignIn,
} from "../pages";

const navItems = () => ({
  main: [
    { path: "/", label: "Home", icon: <HomeIcon />, element: <Home /> },
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
    {
      path: "/help",
      label: "Help",
      icon: <HelpOutlineIcon />,
      element: <Help />,
    },
    { path: "/about", label: "About", icon: <InfoIcon />, element: <About /> },
    {
      path: "/contact",
      label: "Contact",
      icon: <LocalPhoneIcon />,
      element: <Contact />,
    },
  ],
  settings: [
    { path: "/profile", label: "Profile", element: <Profile /> },
    { path: "/payment", label: "Payment", element: <Payment /> },
  ],
  separate: [
    { path: "/signin", element: <SignIn /> },
    { path: "/legal", element: <Legal /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
  ],
});

export const useNavItems = () => {
  const n = navItems();
  const { isAuthenticated } = useAccount();
  const [main, setMain] = useState(n.main);

  useEffect(() => {
    const filteredNavItems = isAuthenticated()
      ? n.main
      : n.main.filter(
          (item) => !["Auctions", "Bids", "Payment"].includes(item.label)
        );
    setMain(filteredNavItems);
  }, [isAuthenticated]);

  return {
    main,
    separate: n.separate,
    settings: n.settings,
  };
};
