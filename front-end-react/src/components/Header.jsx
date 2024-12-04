import { Fragment } from "react";
import { Link } from "react-router-dom";

  function Header() {
      return (
        <Fragment className="header">
      <nav class="flex justify-between bg-white-900 text-black w-screen">
        <div class="px-5 xl:px-12 py-6 flex w-full items-center">
          <a class="text-3xl font-bold font-heading" href="#"></a>
            <h1 class="Logo"><a href="/accueil">Sport<span>C</span>ards</a></h1>
          <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 font-bold">
            <li class="lienRoot text-white">
            <Link to="/accueil">Accueil</Link>
              </li>
              <li class="lienRoot text-white">
              <Link to="/boutique">Boutique</Link>
              </li>
            <li class="lienRoot text-white">
            <Link to="/liste-vehicule">Liste Véhicule</Link>
              </li>
              <li class="lienRoot text-white">
            <Link to="/liste-categorie">Liste Catégorie</Link>
              </li>
            <li class="lienRoot text-white">
            <Link to="/ajout-vehicule-categorie">Ajout Véhicule</Link>
              </li>
          </ul>
        
          <div class="hidden xl:flex items-center space-x-5 items-center">
            <a class="hover:text-gray-200" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m2.15-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>

            </a>
            <a class="flex items-center hover:text-gray-200" href="/panier">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              <span class="flex absolute -mt-5 ml-4">
                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                  </span>
                </span>
            </a>
          
            <Link to="/form-auth" className="flex items-center hover:text-gray-200">
            <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 hover:text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 2.67-6 6h12c0-3.33-2.67-6-6-6z"
    />
</svg>

        </Link>

          </div>
        </div>
      
        <a class="xl:hidden flex mr-6 items-center" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="flex absolute -mt-5 ml-4">
            <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
            </span>
          </span>
        </a>
        <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </a>
      </nav>

        </Fragment>
      );
    }
    
    export default Header;