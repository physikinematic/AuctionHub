import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";

import { Grid2, Paper, Tooltip, Typography, useTheme } from "@mui/material";

import Logo from "../static/images/hublogo.png";

import { useAccount, useError } from "../contexts";
import { useAuctions, useBids } from "../hooks";
import { ActionButton, ItemCard } from "./";

const AuctionItemCard = ({ item }) => {
  const [highestBid, setHighestBid] = useState({});
  const theme = useTheme();
  const cardTime = new Date(item.endDate);
  const [timeLeft, setTimeLeft] = useState(cardTime.getTime() - Date.now());
  const { account, isAuthenticated } = useAccount();
  const { getByAuction } = useBids();
  const { isAccountJoined } = useAuctions();
  const [buttonState, setButtonState] = useState({ owned: false, bid: false });
  const { setError } = useError();

  const textStyle = { fontSize: theme.typography.customResponsive };

  const handleDetailsClick = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const fetchButtonState = async () => {
      const isJoined = await isAccountJoined(item.id);
      setButtonState({
        owned: item.owner === account.id,
        bid: isJoined,
      });
    };

    if (!isAuthenticated()) {
      setButtonState({ owned: false, bid: false });
      return;
    }

    try {
      fetchButtonState();
    } catch (error) {
      setError("Unable to get joined status", error.message);
    }
  }, [account]);

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
    const fetchHighestBid = async () => {
      const bids = await getByAuction(item.id);
      if (bids && bids.length > 0) {
        const highest = bids.reduce((highest, bid) =>
          bid.value > highest.value ? bid : highest
        );
        setHighestBid(highest);
      } else {
        setHighestBid(null); // Set to null if no bids
      }
    };

    try {
      fetchHighestBid();
    } catch (error) {
      setError("Unable to get highest bid", error.message);
    }
  }, []);

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

  const timePaper = ({
    children,
    size,
    bgcolor,
    fontColor,
    border = "1px solid",
    borderColor = "border.grey",
  }) => {
    return (
      <Grid2 item container size={size || "grow"} alignItems="center">
        <Paper
          sx={{
            bgcolor: [bgcolor],
            width: "100%",
            height: { xs: "8vw", sm: "5.5vw", md: "3vw" },
            borderRadius: 0,
            border: [border],
            borderColor: [borderColor],
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
              {highestBid ? `Highest Bid: ${highestBid.value}$` : "No bids yet"}
            </Typography>
            <Typography {...textStyle} color={closeToEndColor}>
              <Grid2
                container
                size="grow"
                alignItems="center"
                justifyContent="center"
                mt={1}
              >
                {timePaper({
                  children: `Ends in`,
                  size: 3.5,
                  bgcolor: "primary.dim",
                  fontColor: "common.white",
                })}
                {timePaper({
                  children: `${days}d`,
                })}
                {timePaper({
                  children: `${String(hours).padStart(2, "0")}h`,
                })}
                {timePaper({
                  children: `${String(minutes).padStart(2, "0")}m`,
                })}
                {timePaper({
                  children: `${String(seconds).padStart(2, "0")}s`,
                })}
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
