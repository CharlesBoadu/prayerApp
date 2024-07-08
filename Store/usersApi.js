import API_URL from "../context/constant";

const getAllUsers = async () => {
  let url = `/users`;
  try {
    const response = await API_URL.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

const getUser = async (data) => {
  let url = `/users`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const removeUser = async (data) => {
  let url = `/user`;
  try {
    const response = await API_URL.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (data) => {
  let url = `/user`;
  try {
    const response = await API_URL.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export default { getAllUsers, getUser, removeUser, updateUser };
