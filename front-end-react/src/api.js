import axios from "axios";

// Création de l'instance Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Base URL de votre API Symfony
  headers: {
    "Content-Type": "application/json", // Spécifie que nous envoyons/recevons du JSON
  },
  timeout: 5000, // Limite le temps d'attente à 5 secondes (optionnel)
});

// Intercepteur pour ajouter le token JWT dans les en-têtes des requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token"); // Récupère le token depuis le localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Ajoute l'en-tête Authorization
    }
    if (process.env.NODE_ENV === "development") {
      console.log("Requête envoyée:", config); // Log uniquement en développement
    }
    return config;
  },
  (error) => {
    console.error("Erreur avant envoi de la requête:", error.message);
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Réponse reçue:", response); // Log uniquement en développement
    }
    return response;
  },
  (error) => {
    console.error("Erreur Axios:", error.message);

    // Gestion des erreurs spécifiques
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Erreur 401: utilisateur non authentifié.");
        // Supprime le token expiré mais ne redirige pas
        localStorage.removeItem("jwt_token");
      } else {
        console.error("Réponse serveur avec erreur:", error.response);
      }
    } else if (error.request) {
      console.error("Aucune réponse reçue:", error.request);
    } else {
      console.error("Erreur lors de la configuration de la requête:", error.message);
    }

    return Promise.reject(error); // Laissez l'erreur remonter pour gestion locale
  }
);

export default api;
