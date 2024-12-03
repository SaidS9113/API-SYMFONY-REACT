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
                setNom(''); // Réinitialiser le champ
                if (onCategorieAdded) {
                    onCategorieAdded(response.data); // Notifier le parent
                }
            })
            .catch((error) => {
                console.error('Erreur lors de l’ajout de la catégorie', error);
                setMessage('Erreur lors de l’ajout de la catégorie.');
            });
    };

    return (
        <div>
            <h2>Ajouter une Catégorie</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom de la catégorie :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter la Catégorie</button>
            </form>
        </div>
    );
}

export default AjoutCategorie;
