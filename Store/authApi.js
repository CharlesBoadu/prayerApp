import API_URL from "../context/constant";

const login = async (data) => {
  let url = `/login`;
  try {
      const response = await API_URL.post(url, data);
      console.log("Login Response:", response);
      return response;
  } catch (error) {
      throw error;
  }
};

export default login;

