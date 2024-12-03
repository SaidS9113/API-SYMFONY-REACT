import React, { useState, useEffect } from 'react';
import AjoutCategorie from './AjoutCategorie';
import api from '../api';

function AjoutProduit() {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        categorie: '',
    });

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        chargerCategories();
    }, []);

    const chargerCategories = () => {
        api.get('/categories')
            .then((response) => {
                setCategories(response.data['member']);
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des catégories', error);
                setMessage('Erreur lors du chargement des catégories.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nom || !formData.prix || !formData.categorie) {
            setMessage('Nom, prix et catégorie sont requis.');
            return;
        }

        api.post('/add-product', {
            nom: formData.nom,
            description: formData.description,
            prix: parseFloat(formData.prix),
            categorie: formData.categorie,
        })
            .then(() => {
                setMessage('Produit ajouté avec succès !');
                setFormData({ nom: '', description: '', prix: '', categorie: '' });
            })
            .catch((error) => {
                console.error('Erreur lors de l’ajout du produit.', error);
                setMessage('Erreur lors de l’ajout du produit.');
            });
    };

    const handleCategorieAdded = (nouvelleCategorie) => {
        setCategories((prevCategories) => [...prevCategories, nouvelleCategorie]);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un Produit</h2>
            {message && (
                <p className="text-center text-sm text-red-500 mb-4">{message}</p>
            )}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 max-w-lg mx-auto"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nom"
                    >
                        Nom :
                    </label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Description :
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="prix"
                    >
                        Prix (€) :
                    </label>
                    <input
                        type="number"
                        name="prix"
                        value={formData.prix}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="categorie"
                    >
                        Catégorie :
                    </label>
                    <select
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories &&
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nom}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ajouter le Produit
                    </button>
                </div>
            </form>
            <AjoutCategorie onCategorieAdded={handleCategorieAdded} />
        </div>
    );
}

export default AjoutProduit;
