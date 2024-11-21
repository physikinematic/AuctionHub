import { fetch } from "./fetch";
const url = "http://localhost:5000/api";

const request = async (method, path, queries, body) => {
  const fullPath =
    url +
    path +
    ((queries?.length > 0 &&
      "?" + queries.map((query) => `${query.name}=${query.value}`).join("&")) ||
      "");

  body = typeof body === "object" ? JSON.stringify(body) : body;

  return await fetch(fullPath, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

const get = async ({ path, queries }) => {
  return await request("GET", path, queries);
};

const post = async ({ path, queries, body }) => {
  return await request("POST", path, queries, body);
};

const patch = async ({ path, queries, body }) => {
  return await request("PATCH", path, queries, body);
};

const put = async ({ path, queries, body }) => {
  return await request("PUT", path, queries, body);
};

const _delete = async ({ path, queries, body }) => {
  return await request("DELETE", path, queries, body);
};

const head = async ({ path, queries }) => {
  return await request("HEAD", path, queries);
};

const options = async ({ path, queries, body }) => {
  return await request("OPTIONS", path, queries, body);
};

export { _delete, get, head, options, patch, post, put };
