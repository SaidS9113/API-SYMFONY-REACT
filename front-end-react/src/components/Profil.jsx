import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import api from "../api"; // Importer votre instance axios préconfigurée

function Profil() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  // États pour les champs utilisateur
  const [userData, setUserData] = useState({
    id: "", // Ajout d'un champ pour l'ID
    nom: "",
    prenom: "",
    adresse_postal: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Vérifier si un token est présent dans le localStorage
  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    if (!token) {
      setErrorMessage("Utilisateur non connecté. Veuillez vous connecter.");
      console.log("Token non trouvé dans le localStorage.");
      return;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        setErrorMessage("Le token a expiré. Veuillez vous reconnecter.");
        return;
      }

      // Récupérer l'ID utilisateur du token décodé
      const userId = decodedToken.user_id; // Assurez-vous que le token contient cet attribut
      fetchUserData(userId);
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      setErrorMessage("Le token est invalide ou ne peut pas être décodé.");
    }
  }, [token]);

  const fetchUserData = async (userId) => {
    try {
      const response = await api.get(`/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data); // Réponse doit inclure les détails utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur :", error);
      setErrorMessage("Impossible de charger vos informations.");
    }
  };

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
    localStorage.removeItem("jwt_token");
    navigate("/accueil");
  };

  // Gérer la modification du profil utilisateur
  const handleProfileChange = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/users/${userData.id}`, // Utilisez l'ID utilisateur ici
        {
          nom: userData.nom,
          prenom: userData.prenom,
          adresse_postal: userData.adresse_postal,
          email: userData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Les informations ont été mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setErrorMessage("Impossible de mettre à jour vos informations.");
    }
  };

  // Gérer le changement de mot de passe
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/users/${userData.id}`, // Utilisez l'ID utilisateur ici
        {
          old_password: passwordData.oldPassword,
          new_password: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Le mot de passe a été changé avec succès !");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error);
      setErrorMessage("Impossible de changer le mot de passe.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Profil Utilisateur</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      
      {/* Formulaire pour modifier les informations du profil */}
      <form onSubmit={handleProfileChange}>
        <div className="space-y-4">
          {/* Champ pour l'ID utilisateur caché */}
          <input
            type="hidden"
            name="id"
            value={userData.id}  // L'ID de l'utilisateur
          />

          {/* Champ pour nom */}
          <div className="flex items-center gap-2">
            <label htmlFor="nom" className="w-24 text-gray-700 font-medium">Nom:</label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={userData.nom}
              onChange={(e) => setUserData({ ...userData, nom: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
          {/* Autres champs similaires */}
          <div className="flex items-center gap-2">
            <label htmlFor="prenom" className="w-24 text-gray-700 font-medium">Prénom:</label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              value={userData.prenom}
              onChange={(e) => setUserData({ ...userData, prenom: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="adresse_postal" className="w-24 text-gray-700 font-medium">Adresse:</label>
            <input
              id="adresse_postal"
              name="adresse_postal"
              type="text"
              value={userData.adresse_postal}
              onChange={(e) => setUserData({ ...userData, adresse_postal: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="w-24 text-gray-700 font-medium">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Mettre à jour le profil
        </button>
      </form>

      {/* Formulaire pour mot de passe */}
      <form onSubmit={handlePasswordChange} className="mt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label htmlFor="old_password" className="w-24 text-gray-700 font-medium">Ancien:</label>
            <input
              id="old_password"
              name="old_password"
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="new_password" className="w-24 text-gray-700 font-medium">Nouveau:</label>
            <input
              id="new_password"
              name="new_password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 mt-4 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
        >
          Changer le mot de passe
        </button>
      </form>

      {/* Boutons */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className="px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
        >
          Supprimer votre compte
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Profil;
