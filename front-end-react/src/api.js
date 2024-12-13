import axios from 'axios';

// Création de l'instance Axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Assurez-vous que cette baseURL est correcte
  headers: {
    'Content-Type': 'application/json', // Spécifie que nous envoyons/recevons du JSON
  },
  timeout: 5000, // Limite le temps d'attente à 5 secondes (optionnel)
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    console.log('Requête envoyée:', config); // Log des détails de la requête
    return config;
  },
  (error) => {
    console.error('Erreur avant envoi de la requête:', error.message);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log('Réponse reçue:', response); // Log des détails de la réponse
    return response;
  },
  (error) => {
    console.error('Erreur Axios:', error.message);

    // Gestion des erreurs spécifiques
    if (error.response) {
      console.error('Réponse serveur avec erreur:', error.response);
    } else if (error.request) {
      console.error('Aucune réponse reçue:', error.request);
    } else {
      console.error('Erreur lors de la configuration de la requête:', error.message);
    }

    // Optionnel : retournez une erreur spécifique si besoin
    return Promise.reject(error);
  }
);

export default api;
