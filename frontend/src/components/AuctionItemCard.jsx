import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";

import { Grid2, Paper, Tooltip, Typography, useTheme } from "@mui/material";

import Logo from "../static/images/hublogo.png";

import { useAccount } from "../contexts";
import { ActionButton, ItemCard } from "./";

const AuctionItemCard = ({ item, type = { owned: false, bid: false } }) => {
  const [highestBid, setHighestBid] = useState({});
  const theme = useTheme();
  const cardTime = new Date(item.endDate);
  const [timeLeft, setTimeLeft] = useState(cardTime.getTime() - Date.now());
  const { account, isAuthenticated } = useAccount();

  const textStyle = { fontSize: theme.typography.customResponsive };

  const handleDetailsClick = (id) => {
    console.log(id);
  };

  const buttonState = isAuthenticated()
    ? {
        owned: type.owned || item["ownerId"] === account["id"],
        bid:
          type.bid || item.bids.some((bid) => bid["ownerId"] === account["id"]),
      }
    : null;

  const actionButton = (label, color) => {
    return (
      <ActionButton
        size={{ xs: 12, sm: "grow" }}
        sx={{ height: { xs: "8vw", sm: "5vw", md: "2.5vw" }, ...textStyle }}
        color={color}
        label={label}
        onClick={() => handleDetailsClick(item.id)}
      />
    );
  };

  const actions = (
    <Grid2
      container
      spacing={1}
      sx={{ width: "100%", height: "100%" }}
      alignItems="center"
      justifyContent="center"
    >
      {buttonState?.owned && // does the user own the item?
        actionButton("Remove")}
      {buttonState?.bid && // is user placing bid on item?
        actionButton("Withdraw")}
      {actionButton("Details", "secondary")}
    </Grid2>
  );

  useEffect(() => {
    const highest = item.bids.reduce((highest, bid) =>
      bid.createdAt > highest.createdAt ? bid : highest
    );
    setHighestBid(highest);
  }, [item.bids]);

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

  const closeToEndColor =
    days === 0 && hours === 0 && minutes === 0 && "primary";

  const timePaper = (children, size, bgcolor, fontColor) => {
    return (
      <Grid2 item container size={size || "grow"} alignItems="center">
        <Paper
          sx={{
            bgcolor: [bgcolor],
            width: "100%",
            height: { xs: "8vw", sm: "5.5vw", md: "3vw" },
            borderRadius: 0,
            boxShadow:
              "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;",
          }}
        >
          <Grid2
            item
            container
            height="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color={fontColor} fontWeight="bold" {...textStyle}>
              {children}
            </Typography>
          </Grid2>
        </Paper>
      </Grid2>
    );
  };

  const containerSize = { xs: 12, md: 6, lg: 4, xl: 3 };

  return (
    <Grid2 item container size={containerSize}>
      <ItemCard
        contents={
          <>
            <Tooltip title="Owned by you">
              <Grid2
                item
                container
                sx={{
                  position: "absolute",
                  fontSize: { xs: "5vw", sm: "2.5vw", md: "1.5vw" },
                }}
              >
                {buttonState?.owned && <FaCrown color="#efbf04" />}
              </Grid2>
            </Tooltip>
            <Grid2 item container justifyContent="center" alignItems="center">
              <Grid2
                sx={{
                  maxHeight: 250,
                  maxWidth: 250,
                  width: "100%",
                  height: "100%",
                  p: 3,
                }}
                component="img"
                src={item.img || Logo}
              />
            </Grid2>
            <Typography {...textStyle} fontWeight="bold">
              {item.name}
            </Typography>
            <Typography {...textStyle}>
              {highestBid ? `Current Bid: ${highestBid.value}$` : "No bids yet"}
            </Typography>
            <Typography {...textStyle} color={closeToEndColor}>
              <Grid2
                container
                size="grow"
                alignItems="center"
                justifyContent="center"
                mt={1}
              >
                {timePaper(`Ends in`, 3.5, "primary.dim", "common.white")}
                {timePaper(`${days}d`)}
                {timePaper(`${String(hours).padStart(2, "0")}h`)}
                {timePaper(`${String(minutes).padStart(2, "0")}m`)}
                {timePaper(`${String(seconds).padStart(2, "0")}s`)}
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
};

export default AuctionItemCard;
