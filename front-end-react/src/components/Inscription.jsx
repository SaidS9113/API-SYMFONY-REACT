import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Inscription() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nom: '',
        prenom: '',
        adressePostal: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation basique des mots de passe
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        // Effacer les messages d'erreur ou de succès précédents
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", {
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                nom: formData.nom,
                prenom: formData.prenom,
                adressePostal: formData.adressePostal
            });

            // Message de succès si l'inscription est réussie
            setSuccessMessage(response.data.message || "Inscription réussie !");
            
            // Redirection vers la page d'accueil après 2 secondes
            setTimeout(() => {
                navigate("/accueil");
            }, 2000);
        } catch (err) {
            // Gestion des erreurs retournées par l'API
            setError(err.response?.data?.error || 'Une erreur est survenue');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                            >
                            Email :
                            </label>
                            <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Votre email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mot de passe :
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Votre mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirmer le mot de passe :
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="nom"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nom :
                        </label>
                        <input
                            id="nom"
                            name="nom"
                            type="text"
                            placeholder="Votre nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="prenom"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Prénom :
                        </label>
                        <input
                            id="prenom"
                            name="prenom"
                            type="text"
                            placeholder="Votre prénom"
                            value={formData.prenom}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="adressePostal"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Adresse Postale :
                        </label>
                        <input
                            id="adressePostal"
                            name="adressePostal"
                            type="text"
                            placeholder="Votre adresse postale"
                            value={formData.adressePostal}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            S'inscrire
                        </button>
                        <Link
                            to="/login"
                            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                        >
                            Déjà un compte ? Connectez-vous
                        </Link>
                    </div>
                </form>

                {/* Affichage des erreurs ou du message de succès */}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
            </div>
        </div>
    );
}

export default Inscription;
