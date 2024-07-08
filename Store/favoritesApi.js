import API_URL from "../context/constant";

const getAllFavoritePrayers = async () => {
  let url = `/favorite-prayers`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const addFavoritePrayer = async (data) => {
  let url = `/favorite-prayers/new`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getFavoritePrayersByUser = async (data) => {
  let url = `/user/favorite-prayers`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const removeFavoritePrayerByUser = async (data) => {
  let url = `/user/favorite-prayer`;
  try {
    const response = await API_URL.delete(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllFavoritePrayers,
  addFavoritePrayer,
  getFavoritePrayersByUser,
  removeFavoritePrayerByUser,
};
