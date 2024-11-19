import { api } from "../api";
import { useAccount } from "../contexts/AccountProvider";

export const useBids = () => {
  const { account, isAuthenticated } = useAccount();

  const getByAuction = async (auctionId) => {
    const response = await api.bid.getAuction(auctionId);
    if (!response.success) return;
    return response.data;
  };

  const getOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    const response = await api.bid.getOwned(account.id, page, limit);
    if (!response.success) return;
    return response.data;
  };

  const addBid = async (data) => {
    if (!isAuthenticated()) return;
    const response = await api.bid.create(data);
    if (!response.success) return;
    return response.data;
  };

  const deleteBid = async (bidId) => {
    if (!isAuthenticated()) return;
    const response = await api.bid.deleteBid(bidId);
    return response.success;
  };

  return {
    getByAuction,
    getOwned,
    addBid,
    deleteBid,
  };
};
