import API_URL from "../context/constant";

const getAllPrayers = async () => {
  let url = `/prayers`;
  try {
    const response = await API_URL.get(url);
    console.log("Initial Response", response);
    return response;
  } catch (error) {
    throw error;
  }
};

const getPrayerById = async (data) => {
  let url = `/prayer-by-id`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getPrayerByUser = async (data) => {
  let url = `/user/prayers`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const addPrayer = async (data) => {
  let url = `/prayer/new`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default { getAllPrayers, getPrayerById, getPrayerByUser, addPrayer };
