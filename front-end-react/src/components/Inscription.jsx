import React, { useState } from "react";
import { Link } from "react-router-dom";

function Inscription() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Exemple de validation basique
        if (formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        // Vous pouvez ajouter la logique d'inscription ici (API, validation avancée, etc.)
        console.log('Formulaire soumis avec :', formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
                <form onSubmit={handleSubmit}>
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
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nom d'utilisateur :
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Votre nom d'utilisateur"
                            value={formData.username}
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
                    <div className="mb-6">
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
            </div>
        </div>
    );
}

export default Inscription;
