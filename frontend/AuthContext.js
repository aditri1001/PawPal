import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [history, setHistory] = useState([]);
  const [cartAmount,setCartAmount] = useState(0);
  const [profileDetail, setProfileDetail] = useState()
  // const [cartProducts, setCartProducts] = useState([]);

  const [cartProducts, setCartProducts] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedCart = localStorage.getItem("cartProducts");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (cartProducts.length > 0) {
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      }
    }
  }, [cartProducts]);

  return (
    <AuthContext.Provider value={{
      isLogin,
      setIsLogin,
      userId,
      setUserId,
      cartProducts,
      setCartProducts,
      amount,
      setAmount,
      history,
      setHistory,
      cartAmount,
      setCartAmount,
      profileDetail,
      setProfileDetail,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
