import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "./";
import { api } from "../api";

const AuctionsContext = createContext();

export const useAuctions = () => {
  return useContext(AuctionsContext);
}

export const AuctionsProvider = ({ children }) => {
  const [ownedAuctions, setOwnedAuctions] = useState([]);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [bids, setBids] = useState([]);
  const { user, isAuthenticated } = useAccount();

  useEffect(() => {
    api.auction.getAll(1, 20).then((res) => setAuctions(res.data));
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      api.auction.getAllOwned(user.id, 1, 20).then((res) => setOwnedAuctions(res.data));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated()) {
      api.auction.getAllBid(user.id, 1, 20).then((res) => setBidAuctions(res.data));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (auctions?.length > 0) {
      const intervalId = setInterval(() => {
        setAuctions((prevAuctions) =>
          prevAuctions.map((auction) => {
            const remainingTime = Math.max(0, new Date(auction.endDate).getTime() - Date.now());
            auction.remainingTime = remainingTime;
            return auction;
          })
        );
      }, 1000);
      return () => clearInterval(intervalId);
    }

  }, [auctions]);

  const addAuction = (auctionData) => {
    setAuctions((prevAuctions) => [...prevAuctions, auctionData]);
  };

  const addBid = (bidData) => {
    setBids((prevBids) => [...prevBids, bidData]);
  };

  return (
    <AuctionsContext.Provider value={{ auctions, ownedAuctions, bidAuctions, addAuction, bids, addBid }}>
      {children}
    </AuctionsContext.Provider>
  );
};