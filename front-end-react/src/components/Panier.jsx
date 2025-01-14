import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PanierContext } from '../PanierContext';

function Panier() {
  const panierContext = useContext(PanierContext);
  const navigate = useNavigate();
  const BASE_URL = 'http://localhost:8000';

  if (!panierContext) {
    throw new Error('Panier must be used within a PanierProvider');
  }
  
  const { panier, setPanier } = panierContext;

  const getImageUrl = (item) => {
    if (item.imageUrl) {
      if (item.imageUrl.startsWith('/uploads')) {
        return `${BASE_URL}${item.imageUrl}`;
      }
      return item.imageUrl;
    }
    const localPanier = JSON.parse(localStorage.getItem('panier') || '[]');
    const localItem = localPanier.find((p) => p.id === item.id);
    const imageUrl = localItem?.imageUrl || '/default-image.jpg';
    if (imageUrl.startsWith('/uploads')) {
      return `${BASE_URL}${imageUrl}`;
    }
    return imageUrl;
  };

  const modifierQuantite = (id, increment) => {
    const nouveauPanier = panier.map((item) => {
      if (item.id === id) {
        const nouvelleQuantite = item.quantite + increment;
        return { ...item, quantite: Math.max(nouvelleQuantite, 1) };
      }
      return item;
    });
    setPanier(nouveauPanier);
    localStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const supprimerProduit = (id) => {
    const nouveauPanier = panier.filter((item) => item.id !== id);
    setPanier(nouveauPanier);
    localStorage.setItem('panier', JSON.stringify(nouveauPanier));
  };

  const calculerSousTotal = () => {
    return panier.reduce((total, item) => total + item.prix * item.quantite, 0).toFixed(2);
  };

  const procederAuPaiement = () => {
    navigate('/formulaire-paiement-stripe');
  };

  // Vérification de la condition des 3 produits distincts
  const panierA3ProduitsDistints = panier.length >= 3;

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col mt-[100px]">
      <div className="bg-[#111111] shadow-md py-4 sticky top-[100px] z-10 border-t-[2px] border-b-[2px]">
        <h1 className="text-2xl font-bold text-white text-center">Votre Panier</h1>
      </div>

      <div className="flex-1 py-6 px-4 flex justify-center overflow-hidden">
        <div className="w-[95%]">
          {panier.length > 0 ? (
            <>
              {/* Affichage mobile */}
              <div className="block md:hidden">
                {panier.map((item) => (
                  <div key={item.id} className="bg-gray-700 shadow-md rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <img
                        src={getImageUrl(item)}
                        alt={item.nom}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-semibold">{item.nom}</p>
                        <p className="text-sm">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                            onClick={() => modifierQuantite(item.id, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantite}</span>
                          <button
                            className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                            onClick={() => modifierQuantite(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm mt-2">{item.prix.toFixed(2)} €</p>
                        <button
                          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 mt-4"
                          onClick={() => supprimerProduit(item.id)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Affichage tablette/desktop */}
              <div className="hidden md:block bg-gray-700 shadow-md rounded-lg overflow-hidden">
                <div className={`overflow-x-auto ${!panierA3ProduitsDistints ? 'max-h-[calc(100vh-250px)] overflow-y-hidden' : 'max-h-[calc(100vh-250px)] overflow-y-auto'}`}>
                  <table className="min-w-full divide-y divide-gray-600">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                          Quantité
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                          Prix
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {panier.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap w-[200px]">
                            <div className="w-[200px] h-[100px]">
                              <img
                                src={getImageUrl(item)}
                                alt={item.nom}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {item.nom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                                onClick={() => modifierQuantite(item.id, -1)}
                              >
                                -
                              </button>
                              <span>{item.quantite}</span>
                              <button
                                className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
                                onClick={() => modifierQuantite(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
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
            </>
          ) : (
            <div className="bg-gray-700 shadow-md rounded-lg p-6 flex items-center justify-center h-[200px]">
              <p className="text-white text-lg">Votre panier est vide. Ajoutez des produits pour continuer.</p>
            </div>
          )}
        </div>
      </div>

      {panier.length > 0 && (
        <div className="bg-[#111111] shadow-md py-4 px-8 sticky bottom-0 z-10 border-t-[2px] border-b-[2px]">
          <div className="w-[85%] mx-auto flex justify-between items-center">
            <p className="text-lg font-bold">Sous-total : {calculerSousTotal()} €</p>
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