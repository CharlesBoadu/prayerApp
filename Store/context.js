import { createContext, useContext, useEffect, useState } from "react";
import AllFetchesApi from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PrayerAppContext = createContext({});

export const PrayerAppProvider = ({ children }) => {
  const [globalName, setGlobalName] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showPrayers, setShowPrayers] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [favoritePrayers, setFavoritePrayers] = useState([]);
  const [fetchedPrayers, setFetchedPrayers] = useState([]);
  const [selectedPrayerCategory, setSelectedPrayerCategory] = useState("");
  const [newNotification, setNewNotification] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPrayers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5005/api/v1/prayers");
      const data = await response.json();
      setFetchedPrayers(data?.data);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
    } catch (error) {
      console.error("Error Fetching All Prayers:", error);
    }
  };

  const fetchFavoritePrayerByUser = async () => {
    const user = await AsyncStorage.getItem("user");
    const userData = JSON.parse(user);

    try {
      const response = await fetch(
        "http://127.0.0.1:5005/api/v1/user/favorite-prayers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userData?.id }),
        }
      );
      const data = await response.json();
      setFavoritePrayers(data?.data);
      setFavoritesCount(data?.data.length);
    } catch (error) {
      console.error("Error Fetching Favorite Prayers:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    fetchPrayers();
    fetchFavoritePrayerByUser();
  }, [triggerFetch]);

  return (
    <PrayerAppContext.Provider
      value={{
        loading,
        setLoading,
        fetchedPrayers,
        isAuthenticated,
        setIsAuthenticated,
        globalName,
        setGlobalName,
        showPrayers,
        setShowPrayers,
        favoritesCount,
        setFavoritesCount,
        favoritePrayers,
        setFavoritePrayers,
        newNotification,
        setNewNotification,
        selectedPrayerCategory,
        setSelectedPrayerCategory,
        triggerFetch,
        setTriggerFetch,
        fetchPrayers,
        fetchFavoritePrayerByUser,
      }}
    >
      {children}
    </PrayerAppContext.Provider>
  );
};

export const usePrayerAppContext = () => useContext(PrayerAppContext);
