import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext"; // Import du contexte utilisateur

function Header() {
  const { user, logout } = useContext(UserContext); // Récupération de l'état utilisateur via le contexte

  return (
    <Fragment className="header">
      <nav className="flex justify-between bg-white-900 text-black w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
          <h1 className="Logo">
            <Link to="/accueil">
              Sport<span>C</span>ars
            </Link>
          </h1>
          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 font-bold">
            <li className="lienRoot text-white">
              <Link to="/accueil">Accueil</Link>
            </li>
            <li className="lienRoot text-white">
              <Link to="/boutique">Boutique</Link>
            </li>

            {/* Liens visibles uniquement pour l'administrateur */}
            {user.isAdmin && (
              <>
                <li className="lienRoot text-white">
                  <Link to="/liste-vehicule">Liste Véhicule</Link>
                </li>
                <li className="lienRoot text-white">
                  <Link to="/liste-categorie">Liste Catégorie</Link>
                </li>
                <li className="lienRoot text-white">
                  <Link to="/ajout-vehicule-categorie">Ajout Véhicule</Link>
                </li>
              </>
            )}
          </ul>

          <div className="hidden xl:flex items-center space-x-5">
            {/* Panier séparé */}
            <Link to="/panier" className="relative hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>

            {/* Si utilisateur non connecté */}
            {!user.isAuthenticated && (
              <Link to="/form-auth" className="hover:text-gray-500">
                {/* Icone Connexion */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A3 3 0 017.828 16H16a3 3 0 013 3v1m-9-4h6m-6 0l3-3m-3 3l3 3"
                  />
                </svg>
              </Link>
            )}

            {/* Si utilisateur connecté */}
            {user.isAuthenticated && (
              <>
                <button
                  onClick={logout}
                  className="hover:text-gray-500"
                  title="Déconnexion"
                >
                  {/* Icone Déconnexion */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m-4-1V7m4 9V7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
