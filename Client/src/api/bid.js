import { _delete, get, post } from "./helpers/request";

const path = "/bid";

const getOwned = async (ownerId, page, limit) => {
  return await get({
    path: `${path}/owned/${ownerId}`,
    query: { page, limit },
  });
};

const getAuction = async (auctionId, page, limit) => {
  return await get({
    path: `${path}/auction/${auctionId}`,
    query: { page, limit },
  });
};

const create = async (data) => {
  return await post({
    path: `${path}`,
    body: data,
  });
};

const deleteBid = async (auctionId) => {
  return await _delete({
    path: `${path}/${auctionId}`,
  });
};

const bid = {
  getOwned,
  getAuction,
  create,
  deleteBid,
};

export { bid };
