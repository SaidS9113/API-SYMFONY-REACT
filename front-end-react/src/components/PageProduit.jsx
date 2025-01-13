import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api"; // Assurez-vous que l'API est correctement configurée
import { PanierContext } from "../PanierContext"; // Importez votre contexte

function PageProduit() {
  const { id } = useParams();
  const { ajouterAuPanier } = useContext(PanierContext); // Utilisation du contexte
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Ajout de useNavigate

  const fetchProduit = async () => {
    try {
      const response = await api.get(`/product/${id}`);
      setProduit(response.data);
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de charger les détails du produit.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduit();
  }, [id]);

  if (loading) return <p className="text-white text-center">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!produit) return <p className="text-white text-center">Produit introuvable.</p>;

  const handleAjouterAuPanier = () => {
    ajouterAuPanier({ ...produit, quantite: 1 });
    navigate("/panier"); // Redirection vers la page panier
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#111111] text-white mt-[100px] pt-[100px] pb-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:8000${produit.imageUrl}`}
            alt={produit.nom}
            className="w-full max-w-md rounded-lg shadow-lg mb-4"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500";
            }}
          />
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold mb-4">{produit.nom}</h1>
          <p className="mb-4">{produit.description}</p>
          <p className="text-xl font-bold mb-6">{produit.prix} €</p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleAjouterAuPanier} // Utilisation de la fonction handle
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageProduit;
