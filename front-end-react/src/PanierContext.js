import React, { createContext, useState, useEffect, useContext } from "react";

// Créer le contexte du panier
export const PanierContext = createContext();

// Le PanierProvider sera un composant qui enveloppe l'application et fournit les informations du panier
export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [panierQuantite, setPanierQuantite] = useState(0);

  // Fonction pour récupérer le panier depuis le localStorage
  const chargerPanierDepuisLocalStorage = () => {
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierStocke);

    // Calculer la quantité totale dans le panier
    const totalQuantite = panierStocke.reduce((total, item) => total + item.quantite, 0);
    setPanierQuantite(totalQuantite);
  };

  // Fonction pour ajouter un produit au panier
  const ajouterAuPanier = (produit) => {
    const panierMiseAJour = [...panier];
    const index = panierMiseAJour.findIndex(item => item.id === produit.id);

    if (index !== -1) {
      panierMiseAJour[index].quantite += 1;
    } else {
      panierMiseAJour.push({ ...produit, quantite: 1 });
    }

    // Mettre à jour le panier dans le state
    setPanier(panierMiseAJour);
    setPanierQuantite(panierMiseAJour.reduce((total, item) => total + item.quantite, 0));

    // Sauvegarder le panier dans le localStorage
    localStorage.setItem("panier", JSON.stringify(panierMiseAJour));
  };

  // Fonction pour supprimer un produit du panier
  const supprimerDuPanier = (id) => {
    const panierMiseAJour = panier.filter(item => item.id !== id);

    // Mettre à jour le panier dans le state
    setPanier(panierMiseAJour);
    setPanierQuantite(panierMiseAJour.reduce((total, item) => total + item.quantite, 0));

    // Sauvegarder le panier mis à jour dans le localStorage
    localStorage.setItem("panier", JSON.stringify(panierMiseAJour));
  };

  // Charger le panier au démarrage de l'application
  useEffect(() => {
    chargerPanierDepuisLocalStorage();
  }, []);

  // Utiliser un useEffect pour surveiller les changements du panier et mettre à jour localStorage
  useEffect(() => {
    if (panier.length > 0) {
      // Enregistrer le panier et la quantité dans le localStorage à chaque mise à jour
      localStorage.setItem("panier", JSON.stringify(panier));
      const totalQuantite = panier.reduce((total, item) => total + item.quantite, 0);
      setPanierQuantite(totalQuantite);
    }
  }, [panier]); // Re-exécuter chaque fois que panier change

  // Fournir le panier, la quantité, et les fonctions d'ajout/suppression à toute l'application
  return (
    <PanierContext.Provider value={{ panierQuantite, panier, ajouterAuPanier, supprimerDuPanier }}>
      {children}
    </PanierContext.Provider>
  );
};

// Ajoutez l'exportation de usePanier si vous souhaitez l'utiliser dans d'autres composants
export const usePanier = () => useContext(PanierContext);
