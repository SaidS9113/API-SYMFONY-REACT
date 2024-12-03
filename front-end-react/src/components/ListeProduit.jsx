import React, { useState, useEffect } from 'react';
import api from '../api';

function ListeProduit() {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        api.get('/product')
            .then((response) => {
                const produitsData = response.data || [];
                setProduits(produitsData);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des produits :', error);
            });
    }, []);

    // Fonction pour supprimer un produit
    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit et sa catégorie ?')) {
            api.delete(`/product/${id}`)
                .then(() => {
                    // Met à jour la liste des produits après suppression
                    setProduits(produits.filter((produit) => produit.id !== id));
                    alert('Produit supprimé avec succès.');
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression du produit :', error);
                    alert('Une erreur est survenue lors de la suppression.');
                });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Liste des produits</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Nom</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Prix (€)</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Catégorie</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Date de création</th>
                        </tr>
                    </thead>
                    <tbody>
    {produits.length > 0 ? (
        produits.map((produit) => (
            <tr
                key={produit.id}
                className="hover:bg-gray-100 border-b transition duration-200 ease-in-out"
            >
                <td className="px-6 py-4 text-gray-700">{produit.id}</td>
                <td className="px-6 py-4 text-gray-700">{produit.nom}</td>
                <td className="px-6 py-4 text-gray-700">{produit.description}</td>
                <td className="px-6 py-4 text-gray-700">{produit.prix}</td>
                <td className="px-6 py-4 text-gray-700">{produit.categorie.nom || 'Non défini'}</td>
                <td className="px-6 py-4 text-gray-700">
                    {produit.dateCreation
                        ? new Date(produit.dateCreation).toLocaleDateString()
                        : 'Non disponible'}
                </td>
                {/* Colonne pour le bouton Modifier */}
                <td className="px-6 py-4 text-center">
                    <a
                    
                        href={`/ModificationProduit/${produit.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="Modifier"
                    >
                        ✏️
                    </a>
                </td>
                {/* Colonne pour le bouton Supprimer */}
                <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => handleDelete(produit.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer"
                    >
                        🗑️
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td
                colSpan="8" // Mise à jour pour inclure les nouvelles colonnes
                className="px-6 py-4 text-center text-gray-500"
            >
                Aucun produit trouvé.
            </td>
        </tr>
    )}
</tbody>
                </table>
            </div>
        </div>
    );
}

export default ListeProduit;
