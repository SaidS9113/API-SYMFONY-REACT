import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ListeCategorie() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les catégories depuis l'API
    useEffect(() => {
        fetch('http://localhost:8000/api/categorie') // Remplacez par l'URL de votre API
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data); // Assurez-vous que l'API retourne un tableau de catégories
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Supprimer une catégorie
    const deleteCategorie = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette catégorie ? Cela peut affecter les produits associés.')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/categorie/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Supprimez la catégorie du tableau local
                setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
                alert('Catégorie supprimée avec succès');
            } else {
                const errorData = await response.json();
                alert(`Erreur : ${errorData.error || 'Impossible de supprimer la catégorie'}`);
            }
        } catch (error) {
            alert(`Erreur réseau : ${error.message}`);
        }
    };

    if (loading) return <p className="text-center">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Liste des catégories</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Nom</th>
                            <th className="px-6 py-3 text-center text-gray-600 font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((categorie) => (
                                <tr
                                    key={categorie.id}
                                    className="hover:bg-gray-100 border-b transition duration-200 ease-in-out"
                                >
                                    <td className="px-6 py-4 text-gray-700">{categorie.id}</td>
                                    <td className="px-6 py-4 text-gray-700">{categorie.nom}</td>
                                    <td className="px-6 py-4 text-center flex justify-center space-x-4">
                                        {/* Bouton Modifier */}
                                        <a
                                            href={`/ModificationCategorie/${categorie.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Modifier"
                                        >
                                            ✏️
                                        </a>
                                        {/* Bouton Supprimer */}
                                        <button
                                            onClick={() => deleteCategorie(categorie.id)}
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
                                    colSpan="3"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    Aucune catégorie trouvée.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListeCategorie;
