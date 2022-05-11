import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const res = await fetch("https://react-app-ecomm.herokuapp.com/backend")
    const data = await res.json();

    setProducts(data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    getProducts,
  };
};
