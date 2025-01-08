import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Utilisation de useNavigate pour la redirection
import api from "../api"; // Assurez-vous que l'API est correctement configurée

function PageProduit() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
  
    const ajouterAuPanier = () => {
      const panier = JSON.parse(localStorage.getItem("panier")) || [];
      const produitExistant = panier.find((item) => item.id === produit.id);
  
      if (produitExistant) {
        produitExistant.quantite += 1; // Augmente la quantité si le produit existe déjà
      } else {
        panier.push({ ...produit, quantite: 1 }); // Ajoute le produit avec une quantité de 1
      }
  
      localStorage.setItem("panier", JSON.stringify(panier));
      alert("Produit ajouté au panier !");
    };
  
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!produit) return <p>Produit introuvable.</p>;
  
    return (
      <div className="container mx-auto px-4 py-8">
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{produit.nom}</h1>
            <p className="text-gray-600 mb-4">{produit.description}</p>
            <p className="text-xl font-bold text-gray-800 mb-6">{produit.prix} €</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={ajouterAuPanier}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default PageProduit;
  