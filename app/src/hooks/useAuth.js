import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("user"))
  );

  useEffect(() => {
    localStorage.setItem("user", user || "");
    localStorage.setItem("isLoggedIn", isLoggedIn ? true : "");
  }, [isLoggedIn, user]);

  function login(user) {
    setUser(user);
    setIsLoggedIn(true);
    navigate("/admin/products");
  }

  function signOut() {
    setUser("");
    setIsLoggedIn("");
  }

  return {
    login,
    signOut,

    isLoggedIn,
    user,
  };
};
