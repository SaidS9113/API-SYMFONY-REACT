import { useState, useEffect } from "react";

function Panier() {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierStocke);
  }, []);

  const modifierQuantite = (id, increment) => {
    const nouveauPanier = panier.map((item) => {
      if (item.id === id) {
        const nouvelleQuantite = item.quantite + increment;
        return { ...item, quantite: Math.max(nouvelleQuantite, 1) }; // Quantité minimum : 1
      }
      return item;
    });
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
  };

  const supprimerProduit = (id) => {
    const nouveauPanier = panier.filter((item) => item.id !== id);
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
  };

  const calculerSousTotal = () => {
    return panier.reduce((total, item) => total + item.prix * item.quantite, 0).toFixed(2);
  };

  const procederAuPaiement = () => {
    alert("Redirection vers la page de paiement !");
    // Logique de redirection ou d'intégration avec un service de paiement
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* En-tête fixe */}
      <div className="bg-white shadow-md py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Votre Panier</h1>
      </div>

      {/* Contenu principal avec défilement */}
      <div className="flex-1 py-6 px-4 flex justify-center overflow-hidden">
        <div className="w-[85%]">
          {panier.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-250px)] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantité
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {panier.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap w-[200px]">
                          <div className="w-[200px] h-[100px]">
                            <img
                              src={`http://localhost:8000${item.imageUrl}`}
                              alt={item.nom}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/200x100";
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.nom}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                              onClick={() => modifierQuantite(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{item.quantite}</span>
                            <button
                              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                              onClick={() => modifierQuantite(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                          {item.prix.toFixed(2)} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                            onClick={() => supprimerProduit(item.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center h-[200px]">
              <p className="text-gray-500 text-lg">Votre panier est vide. Ajoutez des produits pour continuer.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pied de page fixe avec le sous-total et le bouton de paiement */}
      {panier.length > 0 && (
        <div className="bg-white shadow-md py-4 px-8 sticky bottom-0 z-10">
          <div className="w-[85%] mx-auto flex justify-between items-center">
            <p className="text-lg font-bold text-gray-800">
              Sous-total : {calculerSousTotal()} €
            </p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={procederAuPaiement}
            >
              Procéder au paiement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;


