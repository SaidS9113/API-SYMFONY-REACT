import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduits, deleteProduit } from "../redux/slices/produitSlice";
import { Link } from "react-router-dom";

function ListeProduit() {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.produit);

  // Charger les produits depuis l'API
  useEffect(() => {
    dispatch(fetchProduits());
  }, [dispatch]);

  // Fonction pour supprimer un produit
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit et sa catégorie ?")) {
      try {
        await dispatch(deleteProduit(id)).unwrap();
        alert("Produit supprimé avec succès.");
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  if (loading) return <p className="text-center">Chargement...</p>;

  // Affichage de l'erreur si elle existe
  if (error) {
    const errorMessage = typeof error === "string" ? error : JSON.stringify(error);
    return <p className="text-center text-red-500">Erreur : {errorMessage}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Liste des véhicules</h1>
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
              <th className="px-6 py-3 text-center text-gray-600 font-medium uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 text-gray-700">
                    {produit.categorie?.nom || "Non défini"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {produit.dateCreation
                      ? new Date(produit.dateCreation).toLocaleDateString()
                      : "Non disponible"}
                  </td>
                  <td className="px-6 py-4 text-center space-x-4">
                    {/* Bouton Modifier */}
                    <Link
                      to={`/ModificationProduit/${produit.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Modifier"
                    >
                      ✏️
                    </Link>
                    {/* Bouton Supprimer */}
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
                  colSpan="7"
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
