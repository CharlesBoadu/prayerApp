const BASE_URL = process.env.BASE_URL;

const fetchAllHealthPrayers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/health/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchAllWealthPrayers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/wealth/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchAllWarfarePrayers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/warfare/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchAllPraisePrayers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/praise/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchAllProtectionPrayers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/protection/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  fetchAllHealthPrayers,
  fetchAllWealthPrayers,
  fetchAllWarfarePrayers,
  fetchAllPraisePrayers,
  fetchAllProtectionPrayers
};
