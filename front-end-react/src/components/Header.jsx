import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/accueil");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <nav className="flex justify-between bg-white-900 text-black w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full justify-between items-center">
          <h1 className="Logo">
            <Link to="/accueil">
              Sport<span>C</span>ars
            </Link>
          </h1>

          {/* Menu principal pour écrans larges */}
          <ul className="hidden 2xl:flex px-4 mx-auto font-semibold font-heading space-x-12 font-bold">
            <li className="lienRoot text-white">
              <Link to="/accueil">Accueil</Link>
            </li>
            <li className="lienRoot text-white">
              <Link to="/boutique">Boutique</Link>
            </li>

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

          <div className="flex items-end space-x-5">
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

            <div className="hidden 2xl:block">
              <Link
                to={user.isAuthenticated ? "/profil-utilisateur" : "/form-auth"}
                className="hover:text-gray-500"
                title={user.isAuthenticated ? "Profil" : "Connexion"}
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                    fill="#000000"
                  />
                  <path
                    d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                    fill="#000000"
                  />
                </svg>
              </Link>
            </div>

            <button
              className="block 2xl:hidden focus:outline-none"
              onClick={toggleMenu}
            >
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 2xl:hidden">
            <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu}></div>
            <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="p-4">
                <button onClick={toggleMenu} className="mb-4">
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <ul className="space-y-4">
                  <li>
                    <Link to="/accueil" onClick={toggleMenu}>Accueil</Link>
                  </li>
                  <li>
                    <Link to="/boutique" onClick={toggleMenu}>Boutique</Link>
                  </li>
                  {user.isAdmin && (
                    <>
                      <li>
                        <Link to="/liste-vehicule" onClick={toggleMenu}>Liste Véhicule</Link>
                      </li>
                      <li>
                        <Link to="/liste-categorie" onClick={toggleMenu}>Liste Catégorie</Link>
                      </li>
                      <li>
                        <Link to="/ajout-vehicule-categorie" onClick={toggleMenu}>Ajout Véhicule</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to={user.isAuthenticated ? "/profil-utilisateur" : "/form-auth"}
                      onClick={toggleMenu}
                    >
                      {user.isAuthenticated ? "Profil" : "Connexion"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;