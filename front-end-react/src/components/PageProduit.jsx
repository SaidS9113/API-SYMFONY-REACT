import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Utilisation de useNavigate pour la redirection
import api from "../api"; // Assurez-vous que l'API est correctement configurée

function PageProduit() {
  const { id } = useParams();  // Récupère l'ID du produit depuis l'URL
  const navigate = useNavigate(); // Utilisation de useNavigate pour gérer les redirections
  
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduit = async () => {
    try {
      const response = await api.get(`/product/${id}`);
      console.log("Réponse API:", response.data); // Ajoutez cette ligne
      setProduit(response.data);
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de charger les détails du produit.");
    } finally {
      setLoading(false);
    }
  };
  
  // Utilisation de useEffect pour appeler la fonction fetchProduit à chaque fois que l'ID change
  useEffect(() => {
    fetchProduit();
  }, [id]); // Recharger le produit si l'ID change
  
  // Gérer l'état de chargement, d'erreur ou de produit vide
  if (loading) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chargement...</h1>
        <p>Veuillez patienter pendant que nous chargeons le produit.</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Produit</h1>
        <p className="text-center text-red-500 mb-4">{error}</p>
      </div>
    );
  }
  
  if (!produit) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Produit introuvable</h1>
        <p className="text-center">Le produit demandé n'existe pas.</p>
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => navigate("/boutique")} // Utilisation de navigate pour rediriger vers la boutique
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonne de gauche : image principale */}
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:8000${produit.imageUrl}`}
            alt={produit.nom}
            className="w-full max-w-md rounded-lg shadow-lg mb-4"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500"; // Remplace si l'image est introuvable
            }}
          />
          <p> {`http://localhost:8000${produit.imageUrl}`}</p>
        </div>

        {/* Colonne de droite : nom, description, prix, bouton */}
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{produit.nom}</h1>
          <p className="text-gray-600 mb-4">{produit.description}</p>
          <p className="text-xl font-bold text-gray-800 mb-6">{produit.prix} €</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageProduit;
