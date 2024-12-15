import { useState, useEffect } from "react";
import api from "../api"; // Instance Axios configurée pour inclure les tokens

function Boutique() {
  const [produits, setProduits] = useState([]); // Stocke les produits
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles

  useEffect(() => {
    // Récupération des produits depuis l'API Symfony
    const fetchProduits = async () => {
      try {
        const response = await api.get("/product"); // Utilisation de l'instance Axios
        setProduits(response.data); // Assurez-vous que votre API retourne un tableau
      } catch (err) {
        console.error("Erreur :", err);
        setError("Impossible de récupérer les produits.");
      } finally {
        setLoading(false); // Indique que le chargement est terminé
      }
    };

    fetchProduits();
  }, []);

  // Gestion des états
  if (loading) return <p className="text-center">Chargement des produits...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;
  if (produits.length === 0)
    return <p className="text-center">Aucun produit disponible pour le moment.</p>;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Boutique</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="border rounded-lg shadow p-4 flex flex-col items-center"
          >
            {/* Image produit : fallback en cas d'absence */}
            <img
              src={produit.image || "https://via.placeholder.com/150"}
              alt={produit.nom}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{produit.nom}</h2>
            <p className="text-sm text-gray-600 mb-2">{produit.description}</p>
            <p className="text-xl font-bold text-orange-600">{produit.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boutique;
