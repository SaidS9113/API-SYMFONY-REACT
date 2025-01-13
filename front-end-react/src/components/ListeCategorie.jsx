import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Importez l'instance Axios configurée

function ListeCategorie() {
  const [categories, setCategories] = useState([]); // Stocke les catégories
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles

  // Charger les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorie"); // Utilisation d'Axios
        setCategories(response.data); // Assurez-vous que l'API retourne un tableau de catégories
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories :", err);
        setError("Impossible de charger les catégories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Supprimer une catégorie
  const deleteCategorie = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ? Cela peut affecter les produits associés.")) {
      return;
    }

    try {
      const response = await api.delete(`/categorie/${id}`); // Utilisation d'Axios
      if (response.status === 200) {
        // Supprimez la catégorie du tableau local
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
        alert("Catégorie supprimée avec succès");
      } else {
        alert("Erreur : Impossible de supprimer la catégorie.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert(`Erreur réseau : ${err.message}`);
    }
  };

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div className="container mx-auto p-4 mt-[100px] text-white">
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
                    <Link
                      to={`/ModificationCategorie/${categorie.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      ✏️
                    </Link>
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
