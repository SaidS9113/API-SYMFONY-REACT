import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import api from "../api"; // Importer votre instance axios préconfigurée

function Profil() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  // États pour les champs utilisateur
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    adresse_postal: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Vérifier si un token est présent dans le localStorage
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Utilisateur non connecté. Veuillez vous connecter.");
      console.log("Token non trouvé dans le localStorage.");
      return;
    }

    // Ajouter une vérification de l'expiration du token
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT pour vérifier son contenu
      const currentTime = Math.floor(Date.now() / 1000); // Heure actuelle en secondes depuis l'époch

      if (decodedToken.exp < currentTime) {
        setErrorMessage("Le token a expiré. Veuillez vous reconnecter.");
        return;
      }
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      setErrorMessage("Le token est invalide ou ne peut pas être décodé.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get("/users"); // Utilisez votre instance axios préconfigurée ici
        setUserData(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur :",
          error
        );
        setErrorMessage("Impossible de charger vos informations.");
      }
    };

    fetchUserData();
  }, [token]);

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
    localStorage.removeItem("jwt_token"); // Supprimer le token du localStorage lors de la déconnexion
    navigate("/accueil"); // Rediriger vers la page d'accueil après déconnexion
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Profil Utilisateur</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <form>
        <div className="space-y-4">
          {/* Nom */}
          <div className="flex items-center gap-2">
            <label htmlFor="nom" className="w-24 text-gray-700 font-medium">
              Nom:
            </label>
            <div className="flex-grow">
              <input
                id="nom"
                name="nom"
                type="text"
                value={userData.nom}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Prénom */}
          <div className="flex items-center gap-2">
            <label htmlFor="prenom" className="w-24 text-gray-700 font-medium">
              Prénom:
            </label>
            <div className="flex-grow">
              <input
                id="prenom"
                name="prenom"
                type="text"
                value={userData.prenom}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Adresse postale */}
          <div className="flex items-center gap-2">
            <label htmlFor="adresse_postal" className="w-24 text-gray-700 font-medium">
              Adresse:
            </label>
            <div className="flex-grow">
              <input
                id="adresse_postal"
                name="adresse_postal"
                type="text"
                value={userData.adresse_postal}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="w-24 text-gray-700 font-medium">
              Email:
            </label>
            <div className="flex-grow">
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Supprimer votre compte
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Déconnexion
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profil;
