import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../config";

export const useCart = () => {
  const [items, setItems] = useState([]);
  const [cookies] = useCookies(["cart"]);
  const [loading, setLoading] = useState(true);
  const refresh = () => {
    setLoading(true);
  };
  const getItems = useCallback(async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/cart`,
        data: {
          cookies,
        },
      });
      let data = response.data.items;
      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [cookies, setItems]);
  useEffect(() => {
    if (loading) {
      getItems();
    }
  }, [getItems, loading]);
  return {
    items,
    getItems,
    cookies,
    refresh,
  };
};
