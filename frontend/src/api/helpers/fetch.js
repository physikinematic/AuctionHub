const _fetch = async (url, request) => {
  const response = await fetch(url, request);
  return await response.json();
};

export { _fetch as fetch };
