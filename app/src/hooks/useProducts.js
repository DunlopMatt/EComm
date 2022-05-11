import { useState, useEffect } from "react";
import { axiosInstance } from "../config";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  
  const getProducts= (async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/"
      })
      let data = response.data.products
      setProducts(data);
    } catch (error){
      console.log(error)
    }
  })

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    getProducts,
  };
};
