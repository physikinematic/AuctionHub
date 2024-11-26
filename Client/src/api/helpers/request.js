import { fetch } from "./fetch";
const url = "http://localhost:5000/api";

const request = async (method, path, queries, body, headers) => {
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
    headers: headers || { "Content-Type": "application/json" },
    credentials: "include",
  });
};

const get = async ({ path, queries, headers }) => {
  return await request("GET", path, queries, headers);
};

const post = async ({ path, queries, body, headers }) => {
  return await request("POST", path, queries, body, headers);
};

const patch = async ({ path, queries, body, headers }) => {
  return await request("PATCH", path, queries, body, headers);
};

const put = async ({ path, queries, body, headers }) => {
  return await request("PUT", path, queries, body, headers);
};

const _delete = async ({ path, queries, body, headers }) => {
  return await request("DELETE", path, queries, body, headers);
};

const head = async ({ path, queries, headers }) => {
  return await request("HEAD", path, queries, headers);
};

const options = async ({ path, queries, body, headers }) => {
  return await request("OPTIONS", path, queries, body, headers);
};

export { _delete, get, head, options, patch, post, put };
