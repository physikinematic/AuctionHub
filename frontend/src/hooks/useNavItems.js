import { useEffect, useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/auctions', label: 'Auctions', icon: <LocalOfferIcon /> },
    { path: '/bids', label: 'Bids', icon: <CardMembershipIcon /> },
    { path: '/help', label: 'Help', icon: <HelpOutlineIcon /> },
    { path: '/about', label: 'About', icon: <InfoIcon /> },
    { path: '/contact', label: 'Contact', icon: <LocalPhoneIcon /> },
];

export const useNavItems = (isAuthenticated) => {
    const [updatedNavItems, setUpdatedNavItems] = useState(navItems);

    useEffect(() => {
        const filteredNavItems = isAuthenticated()
            ? navItems
            : navItems.filter(item => !['Auctions', 'Bids', 'Payment'].includes(item.label));

        setUpdatedNavItems(filteredNavItems);
    }, [isAuthenticated])

    return updatedNavItems;
};