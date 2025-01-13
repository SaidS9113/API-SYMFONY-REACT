import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // Assurez-vous que ce chemin correspond à votre configuration

function ModificationProduit() {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const navigate = useNavigate();
    const [produit, setProduit] = useState({
        nom: '',
        description: '',
        prix: '',
        categorie: '', // Sera initialisé avec l'ID de la catégorie associée
    });

    const [categories, setCategories] = useState([]);

    // Charger les informations du produit et les catégories
    useEffect(() => {
        // Charger les informations du produit
        api.get(`/product/${id}`)
            .then((response) => {
                const productData = response.data;
                setProduit({
                    ...productData,
                    categorie: productData.categorie.id, // Assigne uniquement l'ID de la catégorie
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du produit :', error);
            });

        // Charger les catégories pour les afficher dans le menu déroulant
        const chargerCategories = () => {
            api.get('/categories')
                .then((response) => {
                    setCategories(response.data['member'] || response.data);
                })
                .catch((error) => {
                    console.error('Erreur lors du chargement des catégories', error);
                });
        };

        chargerCategories();
    }, [id]);

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/product/${id}`, produit)
            .then(() => {
                alert('Produit modifié avec succès');
                navigate('/'); // Redirection après la modification
            })
            .catch((error) => {
                console.error('Erreur lors de la modification du produit :', error);
                alert('Une erreur est survenue lors de la modification');
            });
    };

    // Gestion des champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduit((prevProduit) => ({
            ...prevProduit,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto p-6 mt-[100px] text-white">
            <h1 className="text-2xl font-bold text-center mb-6">Modifier le véhicule</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">
                        Nom du produit
                    </label>
                    <input
                        id="nom"
                        name="nom"
                        type="text"
                        value={produit.nom}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={produit.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="prix" className="block text-gray-700 font-bold mb-2">
                        Prix (€)
                    </label>
                    <input
                        id="prix"
                        name="prix"
                        type="number"
                        value={produit.prix}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categorie" className="block text-gray-700 font-bold mb-2">
                        Catégorie
                    </label>
                    <select
                        id="categorie"
                        name="categorie"
                        value={produit.categorie}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories && categories.length > 0 && categories.map((cat) => (
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
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ModificationProduit;
