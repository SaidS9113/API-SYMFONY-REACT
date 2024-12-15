import React from "react";
import { Navigate } from "react-router-dom";

// Fonction pour récupérer les rôles depuis le token JWT
export const getUserRoles = () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) return []; // Si aucun token, retourne un tableau vide

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Décodage du payload du token JWT
    return decoded.roles || []; // Retourne les rôles ou un tableau vide
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return []; // En cas d'erreur, retourne un tableau vide
  }
};

// Fonction pour vérifier si l'utilisateur est administrateur
export const isAdmin = () => {
  const roles = getUserRoles();
  return roles.includes("ROLE_ADMIN"); // Vérifie si ROLE_ADMIN est présent
};

// Composant pour protéger les routes
const ProtectionRoute = ({ children, roles }) => {
  const token = localStorage.getItem("jwt_token");

  // Vérification de l'authentification
  if (!token) {
    // Si l'utilisateur n'est pas authentifié, redirige vers /form-auth
    return <Navigate to="/form-auth" />;
  }

  // Vérification des rôles, si requis
  if (roles && roles.length > 0) {
    const userRoles = getUserRoles();

    // Vérifie si l'utilisateur a au moins un des rôles requis
    const hasRole = roles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" />; // Redirige si les rôles ne correspondent pas
    }
  }

  return children; // Rend le composant enfant si toutes les conditions sont remplies
};

export default ProtectionRoute;
