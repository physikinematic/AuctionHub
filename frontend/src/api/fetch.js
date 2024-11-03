const link = 'http://localhost:5000/api/';

const _fetch = async (args) => {
  try {
    const response = await fetch(`${link}${args}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export {_fetch as fetch};