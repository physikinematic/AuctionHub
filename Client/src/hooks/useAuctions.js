import { api } from "../api";
import { useAccount, useError } from "../contexts";

export const useAuctions = () => {
  const { account, isAuthenticated } = useAccount();
  const { setError } = useError();

  const setRemainingTime = (auction) => {
    const remainingTime = Math.max(
      0,
      new Date(auction.endDate).getTime() - Date.now()
    );
    auction.remainingTime = remainingTime;
    return auction;
  };

  const getAll = async (page, limit) => {
    try {
      const { data, success } = await api.auction.getAll(page, limit);
      if (!success) return;
      data.map((item) => setRemainingTime(item));
      return data;
    } catch (error) {
      setError("Unable to fetch auctions", error.message);
      return;
    }
  };

  const getOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    try {
      const { data, success } = await api.auction.getOwned(
        account.id,
        page,
        limit
      );
      if (!success) return;
      data.map((item) => setRemainingTime(item));
      return data;
    } catch (error) {
      setError("Unable to fetch auctions", error.message);
      return;
    }
  };

  const getNotOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    try {
      const { data, success } = await api.auction.getNotOwned(page, limit);
      if (!success) return;
      data.map((item) => setRemainingTime(item));
      return data;
    } catch (error) {
      setError("Unable to fetch auctions", error.message);
      return;
    }
  };

  const getBidded = async (page, limit) => {
    if (!isAuthenticated()) return;

    try {
      const { data, success } = await api.auction.getBidded(
        account.id,
        page,
        limit
      );
      if (!success) return;
      data.map((item) => setRemainingTime(item));
      return data;
    } catch (error) {
      setError("Unable to fetch auctions", error.message);
      return;
    }
  };

  const isAccountJoined = async (auctionId) => {
    if (!isAuthenticated()) return;
    try {
      const { success, data } = await api.auction.isAccountJoined(auctionId);
      if (!success) return;
      return data;
    } catch (error) {
      setError("Unable to fetch auctions", error.message);
      return;
    }
  };

  const addAuction = async (auctionData) => {
    if (!isAuthenticated()) return;

    try {
      const { success, data } = await api.auction.addAuction(auctionData);
      if (!success) return;
      return data;
    } catch (error) {
      setError("Unable to add auction", error.message);
      return;
    }
  };

  const deleteAuction = async (id) => {
    if (!isAuthenticated()) return;

    try {
      const { success } = await api.auction.deleteAuction(id);
      return success;
    } catch (error) {
      setError("Unable to delete auction", error.message);
      return;
    }
  };

  return {
    getAll,
    getOwned,
    getNotOwned,
    getBidded,
    isAccountJoined,
    addAuction,
    deleteAuction,
  };
};
