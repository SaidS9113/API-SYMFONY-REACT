import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api";

// Import des images locales
import bugattiImage from "../assets/img/bugattiProduct.jpg";
import porscheImage from "../assets/img/porsheProduct.webp";
import bmwImage from "../assets/img/bmwProduct.jpg";  // Ajout de l'image pour le produit BMW
import toyotaImage from "../assets/img/ToyotaProduct.jpg";  // Ajout de l'image pour le produit Toyota

function SectionProduit() {
  const produitsFictifs = [
    {
      id: 1,
      nom: "Bugatti Chiron Super Sport 300+",
      description: "Hypercar de luxe et ultra-puissante.",
      prix: 4000000,
      image_url: bugattiImage,
      redirection_url: "/produit-bugatti-chiron", // URL fixe pour ce produit
    },
    {
      id: 2,
      nom: "Porsche 911 Turbo S",
      description: "Voiture sportive, performante et élégante.",
      prix: 300000,
      image_url: porscheImage,
      redirection_url: "/produit-porche-911", // URL fixe pour ce produit
    },
    {
      id: 3,
      nom: "BMW M5 Competition",
      description: "Berline sportive avec 625 chevaux.",
      prix: 150000,
      image_url: bmwImage,
      redirection_url: "/produit-bmw-m5", // URL fixe pour ce produit
    },
    {
      id: 4,
      nom: "Toyota RAV4 Hybrid",
      description: "SUV hybride polyvalent et économique.",
      prix: 40000,
      image_url: toyotaImage,
      redirection_url: "/produit-toyota-rav4", // URL fixe pour ce produit
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
        // Filtrer les produits pour n'afficher que ceux avec id 1, 2, 3 et 4
        const filteredProducts = newProducts.filter((product) =>
          [1, 2, 3, 4].includes(product.id)
        );

        // Mise à jour des produits affichés avec ceux filtrés
        const updatedProducts = filteredProducts.map((product) => ({
          ...product,
          redirection_url: `/page-produit/${product.id}`,
        }));
        setProduits(updatedProducts);

        // Met à jour les URLs des images avec celles provenant de la base de données
        const updatedImageUrls = filteredProducts.reduce((acc, produit) => {
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

  // Animation d'apparition avec délai
  const productRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          entry.target.classList.add("fade-in");
          entry.target.style.animationDelay = `${index * 0.3}s`; // Délai de 1s pour chaque produit suivant
        }
      });
    }, { threshold: 0.1 });

    productRef.current.forEach((product) => {
      if (product) {
        observer.observe(product);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mt-[50px] bg-[#111111] text-white">
      <h1 className="text-4xl font-bold mb-10 text-center pr-[20px] pl-[20px]">Voitures les plus vendus</h1>
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      {/* Grid layout pour la disposition responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Affichage des produits 1 et 2 uniquement sur mobile */}
        {produits.map((produit, index) => (
          <div
            key={produit.id}
            className={`rounded-lg shadow-[0px_10px_20px_2px_rgba(255,255,255,0.5)] p-4 flex flex-col items-center bg-[#111111] opacity-0 transition-opacity duration-1000`}
            ref={(el) => productRef.current[produit.id] = el}
            data-index={produit.id} // Ajouter l'index pour le délai
          >
            <Link to={produit.redirection_url} className="w-full">
              <img
                src={imageUrls[produit.id] || "https://via.placeholder.com/150"}
                alt={produit.nom}
                className="w-full h-40 object-cover mb-4 rounded"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </Link>

            <Link to={produit.redirection_url}>
              <h2 className="text-lg font-semibold text-white text-center">{produit.nom}</h2>
            </Link>
            <p className="text-sm text-gray-400 mb-2 text-center">{produit.description}</p>
            <p className="text-xl font-bold text-orange-400 text-center">{produit.prix} €</p>
          </div>
        ))}
      </div>

      {/* Bouton redirigeant vers /boutique */}
      <div className="flex justify-center mt-8">
        <Link to="/boutique">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300">
            Voir plus de produits
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SectionProduit;
