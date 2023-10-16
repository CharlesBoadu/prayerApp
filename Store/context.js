import { createContext, useContext } from "react";
import AllFetchesApi from "./api";

export const PrayerAppContext = createContext({});

export const PrayerAppProvider = ({ children }) => {
  const [fetchedHealthPrayers, setFetchedHealthPrayers] = useState([]);
  const [fetchedWealthPrayers, setFetchedWealthPrayers] = useState([]);
  const [fetchedWarfarePrayers, setFetchedWarfarePrayers] = useState([]);
  const [fetchedPraisePrayers, setFetchedPraisePrayers] = useState([]);
  const [fetchedProtectionPrayers, setFetchedProtectionPrayers] = useState([]);

  useEffect(() => {
    const fetchHealthPrayers = async () => {
      try {
        const response = await AllFetchesApi.fetchAllHealthPrayers();
        const data = await response.json();
        setFetchedHealthPrayers(data);
      } catch (error) {
        console.error("Error fetching health prayers:", error);
      }
    };

    const fetchWealthPrayers = async () => {
      const response = await AllFetchesApi.fetchAllWealthPrayers();
      const data = await response.json();
      setFetchedWealthPrayers(data);
    };

    const fetchWarfarePrayers = async () => {
      const response = await AllFetchesApi.fetchAllWarfarePrayers();
      const data = await response.json();
      setFetchedWarfarePrayers(data);
    };

    const fetchProtectionPrayers = async () => {
      const response = await AllFetchesApi.fetchAllProtectionPrayers();
      const data = await response.json();
      setFetchedProtectionPrayers(data);
    };

    const fetchPraisePrayers = async () => {
      const response = await AllFetchesApi.fetchAllPraisePrayers();
      const data = await response.json();
      setFetchedPraisePrayers(data);
    };

    fetchHealthPrayers();
    fetchWealthPrayers();
    fetchWarfarePrayers();
    fetchProtectionPrayers();
    fetchPraisePrayers();
  }, []);

  return (
    <PrayerAppContext.Provider
      value={{
        fetchedHealthPrayers,
        fetchedWealthPrayers,
        fetchedWarfarePrayers,
        fetchedPraisePrayers,
        fetchedProtectionPrayers,
      }}
    >
      {children}
    </PrayerAppContext.Provider>
  );
};

export const usePrayerAppContext = () => useContext(PrayerAppContext);
