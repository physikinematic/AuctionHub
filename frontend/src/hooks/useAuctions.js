import { api } from "../api";
import { useAccount } from "../contexts";

export const useAuctions = () => {
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
    const { data, success } = await api.auction.getAll(page, limit);
    if (!success) return;
    data.map((item) => setRemainingTime(item));
    return data;
  };

  const getOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    const { data, success } = await api.auction.getOwned(
      account.id,
      page,
      limit
    );
    if (!success) return;
    data.map((item) => setRemainingTime(item));
    return data;
  };

  const getNotOwned = async (page, limit) => {
    if (!isAuthenticated()) return;
    const { data, success } = await api.auction.getNotOwned(page, limit);
    if (!success) return;
    data.map((item) => setRemainingTime(item));
    return data;
  };

  const getBidded = async (page, limit) => {
    if (!isAuthenticated()) return;
    const { data, success } = await api.auction.getBidded(
      account.id,
      page,
      limit
    );
    if (!success) return;
    data.map((item) => setRemainingTime(item));
    return data;
  };

  const isAccountJoined = async (auctionId) => {
    if (!isAuthenticated()) return;
    const { success, data } = await api.auction.isAccountJoined(auctionId);
    if (!success) return;
    return data;
  };

  const addAuction = async (auctionData) => {
    if (!isAuthenticated()) return;
    const { success, data } = await api.auction.addAuction(auctionData);
    if (!success) return;
    return data;
  };

  const deleteAuction = async (id) => {
    if (!isAuthenticated()) return;
    const { success } = await api.auction.deleteAuction(id);
    return success;
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
