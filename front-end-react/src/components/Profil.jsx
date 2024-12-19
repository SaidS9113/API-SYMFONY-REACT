import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Profil() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Appelle la méthode logout pour supprimer le token
    logout();

    // Redirection après déconnexion
    navigate("/accueil");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Profil Utilisateur</h2>
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
                type="text"
                placeholder="Entrez votre nom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
                type="text"
                placeholder="Entrez votre prénom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Adresse postale */}
          <div className="flex items-center gap-2">
            <label htmlFor="adresse" className="w-24 text-gray-700 font-medium">
              Adresse:
            </label>
            <div className="flex-grow">
              <input
                id="adresse"
                type="text"
                placeholder="Entrez votre adresse postale"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
                type="email"
                placeholder="Entrez votre email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="flex items-center gap-2">
            <label htmlFor="password" className="w-24 text-gray-700 font-medium">
              Mot de passe:
            </label>
            <div className="flex-grow">
              <input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
            type="button"
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Modifier
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
