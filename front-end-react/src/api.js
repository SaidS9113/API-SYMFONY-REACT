import axios from "axios";

// Création de l'instance Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Base URL de votre API Symfony
  headers: {
    "Content-Type": "application/json", // Spécifie que nous envoyons/recevons du JSON
  },
  timeout: 5000, // Temps limite pour une requête (optionnel)
});

// Intercepteur pour ajouter le token JWT dans les en-têtes des requêtes
api.interceptors.request.use(
  (config) => {
    // Récupère le token JWT depuis le localStorage
    const token = localStorage.getItem("jwt_token");
    if (token) {
      // Si le token existe, ajoute l'en-tête Authorization avec le token
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Affiche les logs uniquement en mode développement
    if (process.env.NODE_ENV === "development") {
      console.log("Requête envoyée:", config);
    }
    console.log("aaaaaaaaaaa:", config);
    return config; // Retourne la configuration modifiée
  },
  (error) => {
    // Erreur avant l'envoi de la requête
    console.error("Erreur avant envoi de la requête:", error.message);
    return Promise.reject(error); // Propage l'erreur pour gestion
  }
);

// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use(
  (response) => {
    // Affiche les logs uniquement en mode développement
    if (process.env.NODE_ENV === "development") {
      console.log("Réponse reçue:", response);
    }
    console.log("bbbbbbbbb:", response);
    return response; // Retourne la réponse en cas de succès
  },
  (error) => {
    console.error("Erreur Axios:", error.message);

    // Vérifie si une réponse est reçue avec une erreur spécifique
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Erreur 401: utilisateur non authentifié.");

        // Supprime le token expiré pour éviter des utilisations futures
        if (localStorage.getItem("jwt_token")) {
          localStorage.removeItem("jwt_token");
        }
        // Vous pouvez rediriger l'utilisateur vers la page de connexion
        // window.location.href = "/login"; // Par exemple, rediriger vers la page de connexion
      } else {
        console.error("Réponse serveur avec erreur:", error.response);
      }
    } else if (error.request) {
      // Cas où aucune réponse n'a été reçue du serveur
      console.error("Aucune réponse reçue:", error.request);
    } else {
      // Cas d'une erreur liée à la configuration de la requête
      console.error("Erreur lors de la configuration de la requête:", error.message);
    }

    return Promise.reject(error); // Propage l'erreur pour gestion locale
  }
);

export default api;
