import { useState, useEffect } from "react";


function Boutique() {
  const [produits, setProduits] = useState([]);

  // Déclarez les URLs des images
  const images = {
    1: "https://via.placeholder.com/150",
    2: "https://via.placeholder.com/150",
    3: "https://via.placeholder.com/150",
    4: "https://via.placeholder.com/150",
  };

  useEffect(() => {
    // Récupération des produits depuis l'API Symfony
    fetch("http://localhost:8000/api/product")
      .then((response) => response.json())
      .then((data) => setProduits(data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Boutique</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="border rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={images[produit.id] || "https://via.placeholder.com/150"}
              alt={produit.nom}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{produit.nom}</h2>
            <p className="text-sm text-gray-600 mb-2">{produit.description}</p>
            <p className="text-xl font-bold text-orange-600">{produit.prix}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boutique;
