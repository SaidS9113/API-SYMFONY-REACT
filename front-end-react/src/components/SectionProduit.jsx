import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

// Import des images locales
import bugattiImage from "../assets/img/bugattiProduct.jpg";
import porscheImage from "../assets/img/porsheProduct.webp";
import bmwImage from "../assets/img/bmwProduct.jpg";
import toyotaImage from "../assets/img/ToyotaProduct.jpg";

function SectionProduit() {
  const produitsFictifs = [
    {
      id: 1,
      nom: "Bugatti Chiron Super Sport 300+",
      description: "Hypercar de luxe ultra-puissante.",
      prix: 4000001,
      image_url: bugattiImage,
      redirection_url: "/produit-bugatti-chiron", // URL fixe pour ce produit
    },
    {
      id: 2,
      nom: "Porsche 911 Turbo S",
      description: "Voiture sportive, performante et élégante.",
      prix: 300001,
      image_url: porscheImage,
      redirection_url: "/produit-porche-911", // URL fixe pour ce produit
    },
    {
      id: 3,
      nom: "BMW M5 Competition",
      description: "Berline sportive avec 625 chevaux.",
      prix: 150001,
      image_url: bmwImage,
      redirection_url: "/produit-produit-BMW_5", // URL fixe pour ce produit
    },
    {
      id: 4,
      nom: "Toyota RAV4 Hybrid",
      description: "SUV hybride polyvalent et économique.",
      prix: 40001,
      image_url: toyotaImage,
      redirection_url: "/produit-toyota-RAV4", // URL fixe pour ce produit
    },
  ];

  const [produits, setProduits] = useState(produitsFictifs); // Initialisation avec les produits fictifs
  const [imageUrls, setImageUrls] = useState({}); // Stocke les URLs des images à afficher
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Initialise les URLs des images avec les images locales
    const initialImageUrls = produitsFictifs.reduce((acc, produit) => {
      acc[produit.id] = produit.image_url; // Associe chaque produit à son image locale
      return acc;
    }, {});
    setImageUrls(initialImageUrls);
  }, []);

  const fetchProduits = async (page) => {
    try {
      setLoading(true); // Démarre le chargement
      const response = await api.get(`/product?page=${page}&limit=10`);
      const newProducts = response.data;

      if (newProducts.length === 0) {
        setHasMore(false);
        setError("Aucun produit trouvé.");
      } else {
        // Lorsque la base de données fonctionne, les URLs dynamiques sont utilisées
        const updatedProducts = newProducts.map((product) => ({
          ...product,
          redirection_url: `/page-produit/${product.id}`,
        }));
        setProduits(updatedProducts);

        // Met à jour les URLs des images avec celles provenant de la base de données
        const updatedImageUrls = newProducts.reduce((acc, produit) => {
          acc[produit.id] = `http://localhost:8000${produit.image_url}`;
          return acc;
        }, {});
        setImageUrls((prevImageUrls) => ({
          ...prevImageUrls,
          ...updatedImageUrls,
        }));
      }
    } catch (err) {
      console.error("Erreur :", err);
      setError("");
    } finally {
      setLoading(false); // Arrête le chargement une fois la requête terminée
    }
  };

  useEffect(() => {
    fetchProduits(page);
  }, [page]);

  return (
    <div className="p-[50px] bg-[#111111] text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">Voitures les plus vendus</h1>
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="border border-white rounded-lg shadow p-4 flex flex-col items-center bg-[#111111]"
          >
            <Link to={produit.redirection_url} className="w-full">
              <img
                // Utilise l'URL stockée dans `imageUrls` pour chaque produit
                src={imageUrls[produit.id] || "https://via.placeholder.com/150"} // Image de secours si aucune URL
                alt={produit.nom}
                className="w-full h-40 object-cover mb-4 rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150"; // Si l'image échoue à se charger
                }}
              />
            </Link>

            <Link to={produit.redirection_url}>
              <h2 className="text-lg font-semibold text-white">{produit.nom}</h2>
            </Link>
            <p className="text-sm text-gray-400 mb-2">{produit.description}</p>
            <p className="text-xl font-bold text-orange-400">{produit.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionProduit;
