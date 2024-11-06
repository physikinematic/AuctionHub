import { _delete, get, post } from "./helpers/request";

const mainPath = '/auction';

const getAll = async (page, limit) => {
  return await get({
    path: `${mainPath}/all`,
    query: { page, limit }
  });
}

const getOwned = async (ownerId, page, limit) => {
  return await get({
    path: `${mainPath}/owned/${ownerId}`,
    query: { page, limit }
  });
}

const getBidded = async (ownerId, page, limit) => {
  return await get({
    path: `${mainPath}/bidded/${ownerId}`, 
    query: { page, limit }
  });
}

const addAuction = async (data) => {
  return await post({
    path: `${mainPath}`, 
    body: data
  });
}

const addBid = async (auctionId, data) => {
  return await post({
    path: `${mainPath}/${auctionId}/bid`, 
    body: data
  });
}

const deleteBid = async (auctionId, bidId) => {
  return await _delete({
    path: `${mainPath}/${auctionId}/bid/${bidId}`, 
  });
}

const deleteAuction = async (auctionId) => {
  return await _delete({
    path: `${mainPath}/${auctionId}`, 
  });
}

const auction = { getAll, getBidded, getOwned, addAuction, addBid, deleteAuction, deleteBid };

export { auction };