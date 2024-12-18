import { Fragment } from "react";
import { Link } from "react-router-dom";

function Profil() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profil Utilisateur</h2>

      <form>
        <div className="space-y-4">
          {/* Nom */}
          <div className="flex items-center gap-2">
            <label htmlFor="nom" className="w-24 text-gray-700 font-medium">
              Nom:
            </label>
            <div className="flex-grow relative">
              <input
                id="nom"
                type="text"
                placeholder="Entrez votre nom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Prénom */}
          <div className="flex items-center gap-2">
            <label htmlFor="prenom" className="w-24 text-gray-700 font-medium">
              Prénom:
            </label>
            <div className="flex-grow relative">
              <input
                id="prenom"
                type="text"
                placeholder="Entrez votre prénom"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <label htmlFor="email" className="w-24 text-gray-700 font-medium">
              Email:
            </label>
            <div className="flex-grow relative">
              <input
                id="email"
                type="email"
                placeholder="Entrez votre email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mot de passe */}
          <div className="flex items-center gap-2">
            <label htmlFor="password" className="w-24 text-gray-700 font-medium">
              Mot de passe:
            </label>
            <div className="flex-grow relative">
              <input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Supprimer le compte
          </button>
          <Link
            to="/logout"
            className="px-6 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Déconnexion
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Profil;
