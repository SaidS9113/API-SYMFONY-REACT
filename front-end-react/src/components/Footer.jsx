import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Réinitialise le message d'état
        try {
            const response = await fetch("http://localhost:8000/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage("Merci ! Vous êtes inscrit à notre newsletter.");
                setEmail(""); // Réinitialise le champ email
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "Une erreur est survenue.");
            }
        } catch (error) {
            setMessage("Impossible de s'inscrire à la newsletter pour le moment.");
        }
    };

    return (
        <footer className="bg-[#111111] text-white py-10 bt border-t-[2.5px] border-t-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Section Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Liens rapides</h2>
                        <ul className="space-y-2 text-center md:text-left">
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
                        <h2 className="text-lg font-semibold mb-4 text-center md:text-left">Abonnez-vous à notre newsletter</h2>
                        <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full sm:w-3/4 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="mt-4 sm:mt-0 sm:ml-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-300"
                            >
                                S'abonner
                            </button>
                        </form>
                        {message && (
                            <p className="mt-4 text-sm text-[#00ed37]">
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 SportCars. Tous droits réservés à Said.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
