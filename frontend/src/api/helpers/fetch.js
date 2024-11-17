const _fetch = async (url, request) => {
  try {
    const response = await fetch(url, request);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { _fetch as fetch };
