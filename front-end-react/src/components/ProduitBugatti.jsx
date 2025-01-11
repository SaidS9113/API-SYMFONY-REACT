import React, { useContext } from "react";
import bugattiImage from "../assets/img/bugattiProduct.jpg";
import { PanierContext } from "../PanierContext"; // Import du contexte

function ProduitBugatti() {
  const produit = {
    id: 1,
    nom: "Bugatti Chiron Super Sport 300+",
    description: "Hypercar de luxe ultra-puissante.",
    prix: 4000000,
    imageUrl: bugattiImage, // Utilisation de l'image importée
  };

  const { ajouterAuPanier } = useContext(PanierContext); // Utilisation du contexte

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section image */}
        <div className="flex flex-col items-center">
          <img
            src={produit.imageUrl}
            alt={produit.nom}
            className="w-full max-w-md rounded-lg shadow-lg mb-4"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500"; // Image par défaut si l'image échoue
            }}
          />
        </div>

        {/* Section informations produit */}
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{produit.nom}</h1>
          <p className="text-gray-600 mb-4">{produit.description}</p>
          <p className="text-xl font-bold text-gray-800 mb-6">{produit.prix.toLocaleString()} €</p>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProduitBugatti;
