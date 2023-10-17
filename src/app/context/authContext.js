"use client"
import {  useEffect, useState } from "react";
import { useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const dataUser = localStorage.getItem("user");
    const dataToken = localStorage.getItem("token");

    if (dataUser && dataToken) {
      const parseUser = JSON.parse(dataUser);
      const parseToken = JSON.parse(dataToken);

      setAuth({
        ...auth,
        user: parseUser,
        token: parseToken,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export {useAuth,AuthProvider};
