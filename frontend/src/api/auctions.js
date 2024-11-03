import { fetch } from "./fetch";

const prefix = 'auction/';
const allPath = `${prefix}all`;
const ownedPath = `${prefix}owned?id=`;
const bidPath = `${prefix}bid?id=`;

const all = () => {
  return fetch(allPath);
}

const bid = (id) => {
  return fetch(`${bidPath}${encodeURIComponent(id)}`);
}

const owned = (id) => {
  return fetch(`${ownedPath}${encodeURIComponent(id)}`);
}

const auction = { all, bid, owned };

export { auction };