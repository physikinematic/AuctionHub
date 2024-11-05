import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";

import { Grid2, Paper, Tooltip, Typography, useTheme } from "@mui/material";

import Logo from '../static/images/hublogo.png';

import { ActionButton, ItemCard } from "./";
import { useAccount, useAuctions } from "../contexts";

const AuctionItemCard = ({ item }) => {
  const { bids } = useAuctions();
  const [highestBid, setHighestBid] = useState({});
  const theme = useTheme();
  const cardTime = new Date(item.endDate);
  const [timeLeft, setTimeLeft] = useState(cardTime.getTime() - Date.now());
  const { user, isAuthenticated } = useAccount();

  const textStyle = { fontSize: theme.typography.customResponsive };

  const handleDetailsClick = (id) => {
    console.log(id);
  };

  const state = isAuthenticated() ? {
    owned: item.ownerId === user.id,
    bid: item.bids.some(bid => bids.some(userBid => userBid.id === bid.id))
  } : null;

  const actionButton = (label, color) => {
    return <ActionButton sx={{ height: '5vh', ...textStyle}} color={color} label={label} onClick={() => handleDetailsClick(item.id)} />
  }
  
  const actions = (
    <Grid2 container columnSpacing={1} sx={{ width: '100%', height: '100%' }} alignItems='center' justifyContent='center'>
      {state?.owned && // does the user own the item?
        actionButton('Remove')
      }
      {state?.bid && // is user placing bid on item?
        actionButton('Withdraw')
      }
      {actionButton('Detials', 'secondary')}
    </Grid2>
  );

  const getBidFromID = (id) => {
    return bids.find(bid => bid.id === id);
  };

  useEffect(() => {
    if (item.bids.length > 0) {
      const highestBidId = item.bids.reduce((highest, bid) =>
        bid.order > highest.order ? bid : highest
      ).id;

      setHighestBid(getBidFromID(highestBidId));
    } else {
      setHighestBid(null);
    }
  }, [item.bids, bids]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        return Math.max(newTime, 0);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTimeLeft = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const { days, hours, minutes, seconds } = formatTimeLeft(timeLeft);

  const closeToEndColor = days === 0 && hours === 0 && minutes === 0 && 'primary';

  const timePaper = (children, size, bgcolor, fontColor) => {
    return (
      <Grid2 item container size={size || 'grow'} alignItems='center'>
        <Paper sx={{ bgcolor: [bgcolor], width: '100%', height: {xs: '5vh', sm: 'calc(2.5vh + 1vw)'}, border: 1, borderColor: 'gray', borderRadius: 0 }}>
          <Grid2 item container height='100%' alignItems='center' justifyContent='center'>
            <Typography color={fontColor} fontWeight='bold'  {...textStyle}>
              {children}
            </Typography>
          </Grid2>
        </Paper>
      </Grid2>
    )
  }

  return (
    <Grid2 item container size={{ xs: 12, sm: 6, md: 3 }}>
      <ItemCard contents={
        <>
          <Tooltip title="Owned by you">
            <Grid2 item container sx={{ position: 'absolute', fontSize: { xs: '5vw', sm: '2.5vw', md: '1.5vw' } }}>
              {state?.owned && <FaCrown color='#efbf04' />}
            </Grid2>
          </Tooltip>
          <Grid2 item container justifyContent='center' alignItems='center'>
            <Grid2 sx={{ maxHeight: 250, maxWidth: 250, width: '100%', height: '100%', p: 3 }} component='img' src={item.img || Logo} />
          </Grid2>
          <Typography {...textStyle} fontWeight='bold'>
            {item.name}
          </Typography>
          <Typography {...textStyle}>
            {highestBid ? `Current Bid: ${highestBid.value}` : 'No bids yet'}
          </Typography>
          <Typography {...textStyle} color={closeToEndColor}>
            <Grid2 container size='grow' alignItems='center' justifyContent='center' mt={1}>
              {timePaper(`Ends in`, 3.5, 'primary.dim', 'common.white',)}
              {timePaper(`${days}d`)}
              {timePaper(`${String(hours).padStart(2, '0')}h`)}
              {timePaper(`${String(minutes).padStart(2, '0')}m`)}
              {timePaper(`${String(seconds).padStart(2, '0')}s`)}
            </Grid2>
          </Typography>
          <Grid2 item container mt={1.5}>
            {actions}
          </Grid2>
        </>
      }
      />
    </Grid2>
  );
}

export default AuctionItemCard;