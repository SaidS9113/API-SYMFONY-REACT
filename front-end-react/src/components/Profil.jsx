import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import api from "../api"; // Importer votre instance axios préconfigurée

function Profil() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  // États pour les champs utilisateur
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    prenom: "",
    adresse_postal: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    passwordForDelete: "", // Champ pour le mot de passe de suppression
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

      const userId = decodedToken.user_id;
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
      setFormData((prevData) => ({ ...prevData, ...response.data }));
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur :", error);
      setErrorMessage("Impossible de charger vos informations.");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("jwt_token");
    navigate("/accueil");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mettre à jour les informations utilisateur
      const userResponse = await api.put(
        `/users/${formData.id}`,
        {
          nom: formData.nom,
          prenom: formData.prenom,
          adresse_postal: formData.adresse_postal,
          email: formData.email,
          old_password: formData.oldPassword || undefined, // Inclus uniquement si renseigné
          new_password: formData.newPassword || undefined, // Inclus uniquement si renseigné
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userResponse.data.requires_logout) {
        setSuccessMessage(
          "Vos modifications ont été enregistrées avec succès. Vous allez être redirigé vers la page d'accueil pour vous reconnecter."
        );
        setTimeout(() => {
          handleLogout();
        }, 5000);
      } else {
        setSuccessMessage("Les modifications ont été enregistrées avec succès !");
        setFormData((prevData) => ({
          ...prevData,
          oldPassword: "",
          newPassword: "",
        }));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setErrorMessage("Impossible d'enregistrer les modifications.");
    }
  };

  // Fonction pour supprimer le compte utilisateur
  const handleDelete = async () => {
    if (!formData.passwordForDelete) {
      alert("Veuillez entrer votre mot de passe pour supprimer votre compte.");
      return;
    }

    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );

    if (confirmDelete) {
      try {
        const deleteResponse = await api.delete(`/users/${formData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { password: formData.passwordForDelete }, // Passer le mot de passe pour vérifier l'identité
        });

        setSuccessMessage("Votre compte a été supprimé avec succès.");
        setTimeout(() => {
          handleLogout(); // Déconnexion après suppression
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de la suppression du profil :", error);
        setErrorMessage("Impossible de supprimer le compte.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#111111] shadow-md rounded-md mt-[100px] text-white">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">Profil Utilisateur</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      <form className="text-white" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />

          <div className="flex items-center gap-2">
            <label htmlFor="nom" className="w-24 text-white-700 font-medium">Nom:</label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="prenom" className="w-24 text-white-700 font-medium">Prénom:</label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="adresse_postal" className="w-24 text-white-700 font-medium">Adresse:</label>
            <input
              id="adresse_postal"
              name="adresse_postal"
              type="text"
              value={formData.adresse_postal}
              onChange={(e) => setFormData({ ...formData, adresse_postal: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="w-24 text-white-700 font-medium">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="old_password" className="w-24 text-white-700 font-medium">Ancien:</label>
            <input
              id="old_password"
              name="old_password"
              type="password"
              value={formData.oldPassword}
              onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="new_password" className="w-24 text-white-700 font-medium">Nouveau:</label>
            <input
              id="new_password"
              name="new_password"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
          Modifier les informations
        </button>
      </form>

      <div className="mt-6">
        <div className="flex flex-col items-start">
          <label htmlFor="passwordForDelete" className="w-full text-white-700 font-medium">Mot de passe (pour supprimer le compte):</label>
          <input
            id="passwordForDelete"
            name="passwordForDelete"
            type="password"
            value={formData.passwordForDelete}
            onChange={(e) => setFormData({ ...formData, passwordForDelete: e.target.value })}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-black"
          />
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 mt-4 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
          >
            Supprimer le compte
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
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
