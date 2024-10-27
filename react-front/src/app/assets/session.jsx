"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Estado inicial de user, intentando recuperar de las cookies al cargar
    const savedUser = Cookies.get("user");
    return savedUser ? JSON.parse(savedUser) : { message: '', token: '' };
  });

  useEffect(() => {
    // Al cargar la página, intenta recuperar el usuario de las cookies si no se ha hecho antes
    const savedUser = Cookies.get("user");
    if (savedUser && !user.token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData)); // Guardar sesión en cookies
  };

  const logout = () => {
    setUser({ message: '', token: '' }); // Restaurar el estado inicial vacío
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
