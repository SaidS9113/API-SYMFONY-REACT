import { useState, useEffect } from "react";
import api from "../api"; // Instance Axios configurée pour inclure les tokens

function Boutique() {
  const [produits, setProduits] = useState([]); // Stocke les produits
  const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
  const [error, setError] = useState(null); // Stocke les erreurs éventuelles
  const [page, setPage] = useState(1); // Page actuelle pour la pagination
  const [hasMore, setHasMore] = useState(true); // Indique s'il y a encore des produits à charger

  // Données statiques pour affichage en cas d'erreur
  const produitsStatics = [
    {
      id: 1,
      nom: "Produit Exemple 1",
      description: "Description du produit exemple 1.",
      prix: 10.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      nom: "Produit Exemple 2",
      description: "Description du produit exemple 2.",
      prix: 20.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      nom: "Produit Exemple 3",
      description: "Description du produit exemple 3.",
      prix: 30.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      nom: "Produit Exemple 4",
      description: "Description du produit exemple 4.",
      prix: 60.0,
      image: "https://via.placeholder.com/150",
    },
  ];

  // Fonction pour récupérer les produits depuis l'API
  const fetchProduits = async (page) => {
    try {
      const response = await api.get(`/product?page=${page}&limit=10`); // Pagination par page
      const newProducts = response.data;

      // Si la réponse ne contient pas de produits, on arrête de charger
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        // Ajoute les nouveaux produits en évitant les doublons
        setProduits((prevProduits) => {
          const allProducts = [...prevProduits, ...newProducts];

          // Filtrer les doublons en comparant les IDs
          const uniqueProducts = allProducts.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.id === product.id)
          );

          return uniqueProducts;
        });
      }
    } catch (err) {
      console.error("Erreur :", err);
      setError("La base de données sera intégrée lors de la finalisation du site");
    } finally {
      setLoading(false); // Indique que le chargement est terminé
    }
  };

  // Utilisation du useEffect pour charger les produits au chargement initial
  useEffect(() => {
    // Si les produits sont déjà stockés dans le cache local, on les charge depuis là
    const cachedProduits = localStorage.getItem("produits");
    if (cachedProduits) {
      setProduits(JSON.parse(cachedProduits));
      setLoading(false);
    } else {
      fetchProduits(page); // Si pas de cache, charger les produits depuis l'API
    }
  }, []); // Le tableau vide [] signifie que ce useEffect ne sera exécuté qu'une fois au chargement initial

  // Gestion des états de chargement, d'erreur et de produit
  if (loading && produits.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chargement...</h1>
        <p>Veuillez patienter pendant que nous chargeons les produits.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Boutique</h1>
        <p className="text-center text-red-500 mb-4">{error}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {produitsStatics.map((produit) => (
            <div
              key={produit.id}
              className="border rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={produit.image}
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

  if (produits.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Boutique</h1>
        <p className="text-center">Aucun produit disponible pour le moment.</p>
      </div>
    );
  }

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
