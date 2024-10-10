// context/SessionContext.js
"use client"
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al cargar la página, intenta recuperar el usuario de las cookies
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData)); // Guardar sesión en cookies
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user"); // Eliminar sesión de cookies
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
