import { createContext, useContext, useEffect, useState } from "react";
import AllFetchesApi from "./api";

export const PrayerAppContext = createContext({});

export const PrayerAppProvider = ({ children }) => {
  const [globalName, setGlobalName] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showPrayers, setShowPrayers] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [favoritePrayers, setFavoritePrayers] = useState([]);
  const [fetchedHealthPrayers, setFetchedHealthPrayers] = useState([]);
  const [fetchedWealthPrayers, setFetchedWealthPrayers] = useState([]);
  const [fetchedWarfarePrayers, setFetchedWarfarePrayers] = useState([]);
  const [fetchedPraisePrayers, setFetchedPraisePrayers] = useState([]);
  const [fetchedProtectionPrayers, setFetchedProtectionPrayers] = useState([]);
  const [selectedPrayerCategory, setSelectedPrayerCategory] = useState("dfdwf");
  const [newNotification, setNewNotification] = useState(true);

  useEffect(() => {
    const fetchHealthPrayers = async () => {
      try {
        const response = await fetch("http://172.20.10.13:6000/health/all");
        const data = await response.json();
        setFetchedHealthPrayers(data?.data);
      } catch (error) {
        console.error("Error fetching health prayers:", error);
      }
    };

    const fetchWealthPrayers = async () => {
      try {
        const response = await fetch("http://172.20.10.13:6000/wealth/all");
        const data = await response.json();
        setFetchedWealthPrayers(data?.data);
      } catch (error) {
        console.error("Error fetching wealth prayers:", error);
      }
    };

    const fetchWarfarePrayers = async () => {
      try {
        const response = await fetch("http://172.20.10.13:6000/warfare/all");
        const data = await response.json();
        setFetchedWarfarePrayers(data?.data);
      } catch (error) {
        console.error("Error fetching warfare prayers:", error);
      }
    };

    const fetchProtectionPrayers = async () => {
      try {
        const response = await fetch("http://172.20.10.13:6000/protection/all");
        const data = await response.json();
        setFetchedProtectionPrayers(data?.data);
      } catch (error) {
        console.error("Error fetching protection prayers:", error);
      }
    };

    const fetchPraisePrayers = async () => {
      try {
        const response = await fetch("http://172.20.10.13:6000/praise/all");
        const data = await response.json();
        setFetchedPraisePrayers(data?.data);
      } catch (error) {
        console.log("Error fetching praise prayers:", error);
      }
    };

    // fetchHealthPrayers();
    // fetchWealthPrayers();
    // fetchWarfarePrayers();
    // fetchProtectionPrayers();
    // fetchPraisePrayers();
  }, []);

  return (
    <PrayerAppContext.Provider
      value={{
        fetchedHealthPrayers,
        fetchedWealthPrayers,
        fetchedWarfarePrayers,
        fetchedPraisePrayers,
        fetchedProtectionPrayers,
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
