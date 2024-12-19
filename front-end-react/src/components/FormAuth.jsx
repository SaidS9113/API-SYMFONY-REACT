import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

function FormAuth() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Utilisation du contexte utilisateur
    const { login } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login_check", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Utiliser la fonction "login" du contexte pour gérer l'état global
            login(response.data.token);

            // Rediriger vers une page protégée (par exemple, accueil)
            navigate("/accueil");
        } catch (error) {
            console.error("Erreur d'authentification :", error);
            if (error.response && error.response.status === 401) {
                setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
            } else {
                setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-sm w-full mb-6">
                <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Entrez votre email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Se connecter
                        </button>
                        <Link
                            to="/inscription"
                            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                        >
                            Créer un compte
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormAuth;
