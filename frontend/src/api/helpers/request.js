import { fetch } from "./fetch";
const url = 'http://localhost:5000/api';

const request = async (path, queries, method, headers, body) => {
  const fullPath = url + path + (queries?.length > 0 && '?' + queries.map(query => `${query.name}=${query.value}`).join('&') || '');

  return await fetch(fullPath,
    {
      method: method,
      headers: headers,
      body: body
    }
  );
}

const get = async (path, contentType, queries) => {
  return await request(path, queries, 'GET', { 'content-type': contentType });
}

const post = async (path, contentType, body, queries) => {
  return await request(path, queries, 'POST', { 'content-type': contentType }, body);
}

const patch = async (path, contentType, body, queries) => {
  return await request(path, queries, 'PATCH', { 'content-type': contentType }, body);
}

const put = async (path, contentType, body, queries) => {
  return await request(path, queries, 'PUT', { 'content-type': contentType }, body);
}

const _delete = async (path, contentType, body, queries) => {
  return await request(path, queries, 'DELETE', { 'content-type': contentType }, body);
}

const head = async (path, contentType, queries) => {
  return await request(path, queries, 'HEAD', { 'content-type': contentType });
}

const options = async (path, contentType, body, queries) => {
  return await request(path, queries, 'OPTIONS', { 'content-type': contentType }, body);
}

export { get, post, patch, put, _delete as delete, head, options };