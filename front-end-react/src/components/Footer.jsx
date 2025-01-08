import { Fragment } from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Section Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Liens rapides</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/accueil"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/boutique"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Boutique
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/form-auth"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section Newsletter */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-lg font-semibold mb-4">Abonnez-vous à notre newsletter</h2>
                        <form className="flex flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="w-full sm:w-3/4 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button
                                type="submit"
                                className="mt-4 sm:mt-0 sm:ml-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300"
                            >
                                S'abonner
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        © 2024 SportCars. Tous droits réservés à Said.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
