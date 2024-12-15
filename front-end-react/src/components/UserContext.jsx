import React, { createContext, useState, useEffect } from "react";
import { getUserRoles } from "./ProtectionRoute";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: !!localStorage.getItem("jwt_token"),
    roles: [],
    isAdmin: false,
  });

  useEffect(() => {
    const initializeUser = () => {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        try {
          const roles = getUserRoles();
          setUser({
            isAuthenticated: true,
            roles: roles,
            isAdmin: roles.includes("ROLE_ADMIN"),
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des rôles :", error);
          // Si le token est invalide, le supprimer
          localStorage.removeItem("jwt_token");
          setUser({
            isAuthenticated: false,
            roles: [],
            isAdmin: false,
          });
        }
      } else {
        setUser({
          isAuthenticated: false,
          roles: [],
          isAdmin: false,
        });
      }
    };

    initializeUser();
  }, []); // Ne se déclenche qu'une fois au montage

  const login = (token) => {
    try {
      localStorage.setItem("jwt_token", token);
      const roles = getUserRoles();
      setUser({
        isAuthenticated: true,
        roles: roles,
        isAdmin: roles.includes("ROLE_ADMIN"),
      });
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setUser({
      isAuthenticated: false,
      roles: [],
      isAdmin: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
