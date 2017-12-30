export const fetchAsync = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 500) {
      window.location = '/';
    }

    const data = await response.json();

    return data;
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e);
    });
  }
};
