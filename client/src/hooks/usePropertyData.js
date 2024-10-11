import { useState, useEffect } from "react";
import { propertyData } from "@/data/mockData";

export const usePropertyData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        setData(propertyData);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};
