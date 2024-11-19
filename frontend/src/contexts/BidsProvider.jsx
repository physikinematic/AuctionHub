import { createContext, useContext } from "react";
import { api } from "../api";
import { useAccount } from "./AccountProvider";

const BidsContext = createContext();

export const useBids = () => {
  return useContext(BidsContext);
};

export const BidsProvider = ({ children }) => {
  const { account, isAuthenticated } = useAccount();

  const getAuction = async (auctionId) => {
    const response = await api.bid.getAuction(auctionId);
    if (response.success) return response.data;
  };

  const getOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    const response = await api.bid.getOwned(account.id, page, limit);
    if (response.success) return response.data;
  };

  const addBid = async (data) => {
    if (!isAuthenticated()) return;
    const response = await api.bid.create(data);
    if (response.success) return response.data;
  };

  const deleteBid = async (bidId) => {
    if (!isAuthenticated()) return;
    const response = await api.bid.deleteBid(bidId);
    return response.success;
  };

  return (
    <BidsContext.Provider value={{ getAuction, getOwned, addBid, deleteBid }}>
      {children}
    </BidsContext.Provider>
  );
};
