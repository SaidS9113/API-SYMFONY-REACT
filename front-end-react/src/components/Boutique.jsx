import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import api from "../api"; // Assurez-vous que l'API est correctement configurée

function Boutique() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProduits = async (page) => {
    try {
      const response = await api.get(`/product?page=${page}&limit=10`);
      const newProducts = response.data;

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProduits((prevProduits) => {
          const allProducts = [...prevProduits, ...newProducts];
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
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedProduits = localStorage.getItem("produits");
    if (cachedProduits) {
      setProduits(JSON.parse(cachedProduits));
      setLoading(false);
    } else {
      fetchProduits(page);
    }
  }, [page]);

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
            <Link to={`/page-produit/${produit.id}`} className="w-full">  {/* Ajout de w-full */}
  <img
    src={`http://localhost:8000${produit.image_url}`}
    alt={produit.nom}
    className="w-full h-40 object-cover mb-4 rounded"
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/150";
    }}
  />
</Link>


            <Link to={`/page-produit/${produit.id}`}>  {/* Ajout du lien pour rediriger vers la page produit */}
              <h2 className="text-lg font-semibold">{produit.nom}</h2>
            </Link>
            <p className="text-sm text-gray-600 mb-2">{produit.description}</p>
            <p className="text-xl font-bold text-orange-600">{produit.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boutique;
