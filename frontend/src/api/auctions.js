import { get } from "./helpers/request";

const mainPath = '/auction';

const getAll = async (page, limit) => {
  return await get(mainPath, 'application/json', { page, limit })
}

const getAllOwned = async (ownerId, page, limit) => {
  return await get(`${mainPath}/owned/${ownerId}`, 'application/json', { page, limit })
}

const getAllBid = async (ownerId, page, limit ) => {
  return await get(`${mainPath}/bid/${ownerId}`, 'application/json', { page, limit })
}

const addAuction = async () => {

}

const addBid = async () => {

}

const deleteBid = async () => {

}

const deleteAuction = async () => {

}

const auction = { getAll, getAllBid, getAllOwned, addAuction, addBid, deleteAuction, deleteBid };

export { auction };