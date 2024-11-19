import { createContext, useContext } from "react";
import { api } from "../api";
import { useAccount } from "./";

const AuctionsContext = createContext();

export const useAuctions = () => {
  return useContext(AuctionsContext);
};

export const AuctionsProvider = ({ children }) => {
  const { account, isAuthenticated } = useAccount();

  const setRemainingTime = (auction) => {
    const remainingTime = Math.max(
      0,
      new Date(auction.endDate).getTime() - Date.now()
    );
    auction.remainingTime = remainingTime;
    return auction;
  };

  const getAll = async (page, limit) => {
    const response = await api.auction.getAll(page, limit);
    if (response.success) {
      const { data } = response;
      data.map((item) => setRemainingTime(item));
      return data;
    }
  };

  const getOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    const response = await api.auction.getOwned(account.id, page, limit);
    if (response.success) {
      const { data } = response;
      data.map((item) => setRemainingTime(item));
      return data;
    }
  };

  const getBidded = async (page, limit) => {
    if (!isAuthenticated()) return;
    const response = await api.auction.getBidded(account.id, page, limit);
    if (response.success) {
      const { data } = response;
      data.map((item) => setRemainingTime(item));
      return data;
    }
  };

  const addAuction = async (auctionData) => {
    if (!isAuthenticated()) return;
    const response = await api.auction.addAuction(auctionData);
    if (response.success) return response.data;
  };

  const deleteAuction = async (id) => {
    if (!isAuthenticated()) return;
    const response = await api.auction.deleteAuction(id);
    return response.success;
  };

  return (
    <AuctionsContext.Provider
      value={{
        getAll,
        getOwned,
        getBidded,
        addAuction,
        deleteAuction,
      }}
    >
      {children}
    </AuctionsContext.Provider>
  );
};
