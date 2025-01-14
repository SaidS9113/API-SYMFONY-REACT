import React, { useContext } from "react";
import BMW_M4Image from "../assets/img/bmwProduct.jpg";
import { PanierContext } from "../PanierContext"; // Import du contexte

function ProduitBMW_M5() {
  const produit = {
    id: 3,
    nom: "BMW M5 Competition",
    description: "Berline sportive avec 625 chevaux.",
    prix: 150000,
    imageUrl: BMW_M4Image, // Utilisation de l'image importée
  };

  const { ajouterAuPanier } = useContext(PanierContext); // Utilisation du contexte

  return (
    <div className="container mx-auto px-4 py-8 mt-[100px]">
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
          <h1 className="text-3xl font-semibold text-white mb-4">{produit.nom}</h1>
          <p className="text-white mb-4">{produit.description}</p>
          <p className="text-xl font-bold text-white mb-6">{produit.prix.toLocaleString()} €</p>
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

export default ProduitBMW_M5;
