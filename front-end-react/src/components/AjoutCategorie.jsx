import React, { useState } from 'react';
import api from '../api';

function AjoutCategorie({ onCategorieAdded }) {
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation simple
        if (!nom.trim()) {
            setMessage('Le nom de la catégorie est requis.');
            return;
        }

        // Requête POST pour ajouter une catégorie
        api.post('/add-categorie', { nom })
            .then((response) => {
                setMessage('Catégorie ajoutée avec succès !');
                setNom('');
                if (onCategorieAdded) {
                    onCategorieAdded(response.data);
                }
            })
            .catch((error) => {
                console.error('Erreur lors de l’ajout de la catégorie', error);
                setMessage('Erreur lors de l’ajout de la catégorie.');
            });
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Ajouter une Catégorie</h2>
            {message && (
                <p className={`text-center mb-4 ${message.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-4">
                    <label
                        htmlFor="nomCategorie"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Nom de la catégorie :
                    </label>
                    <input
                        id="nomCategorie"
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ajouter la Catégorie
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AjoutCategorie;
