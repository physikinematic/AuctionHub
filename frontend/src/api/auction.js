import { _delete, get, post } from "./helpers/request";

const path = "/auction";

const getAll = async (page, limit) => {
  return await get({
    path: `${path}`,
    query: { page, limit },
  });
};

const getOwned = async (ownerId, page, limit) => {
  return await get({
    path: `${path}/owned/${ownerId}`,
    query: { page, limit },
  });
};

const getBidded = async (ownerId, page, limit) => {
  return await get({
    path: `${path}/bidded/${ownerId}`,
    query: { page, limit },
  });
};

const isAccountJoined = async (auctionId) => {
  return await get({
    path: `${path}/joined/${auctionId}`,
  });
};

const create = async (data) => {
  return await post({
    path: `${path}`,
    body: data,
  });
};

const deleteAuction = async (auctionId) => {
  return await _delete({
    path: `${path}/${auctionId}`,
  });
};

const auction = {
  getAll,
  getBidded,
  getOwned,
  isAccountJoined,
  create,
  deleteAuction,
};

export { auction };
