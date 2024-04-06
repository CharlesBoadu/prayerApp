import { createContext, useContext, useEffect, useState } from "react";
import AllFetchesApi from "./api";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/prayers");
        const data = await response.json();
        setFetchedPrayers(data?.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error Fetching All Prayers:", error);
      }
    };

    fetchPrayers();
  }, []);

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
      }}
    >
      {children}
    </PrayerAppContext.Provider>
  );
};

export const usePrayerAppContext = () => useContext(PrayerAppContext);
