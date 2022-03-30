import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
const axios = require("axios");

export const useCart = () => {
  const [items, setItems] = useState([]);
  const [cookies] = useCookies(["cart"]);
  const [loading, setLoading] = useState(true);
  const refresh = () => {
    setLoading(true);
  };
  const getItems = useCallback(async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:4000/cart`,
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
