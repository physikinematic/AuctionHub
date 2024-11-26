import { api } from "../api";
import { useError } from "../contexts";
import { useAccount } from "../contexts/AccountContext";

export const useBids = () => {
  const { account, isAuthenticated } = useAccount();
  const { setError } = useError();

  const getByAuction = async (auctionId) => {
    try {
      const response = await api.bid.getAuction(auctionId);
      if (!response.success) return;
      return response.data;
    } catch (error) {
      setError("Unable to fetch bids", error.message);
      return;
    }
  };

  const getOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    try {
      const response = await api.bid.getOwned(account.id, page, limit);
      if (!response.success) return;
      return response.data;
    } catch (error) {
      setError("Unable to fetch bids", error.message);
      return;
    }
  };

  const addBid = async (data) => {
    if (!isAuthenticated()) return;
    try {
      const response = await api.bid.create(data);
      if (!response.success) return;
      return response.data;
    } catch (error) {
      setError("Unable to fetch bids", error.message);
      return;
    }
  };

  const deleteBid = async (bidId) => {
    if (!isAuthenticated()) return;
    try {
      const response = await api.bid.deleteBid(bidId);
      return response.success;
    } catch (error) {
      setError("Unable to fetch bids", error.message);
      return;
    }
  };

  return {
    getByAuction,
    getOwned,
    addBid,
    deleteBid,
  };
};
