import React, { createContext, useState, useEffect } from "react";

// Créer le contexte du panier
export const PanierContext = createContext();

// Le PanierProvider enveloppe l'application pour fournir les informations du panier
export const PanierProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [panierQuantite, setPanierQuantite] = useState(0);

  // Fonction pour charger le panier depuis le localStorage
  const chargerPanierDepuisLocalStorage = () => {
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierStocke);

    // Met à jour la quantité totale des articles
    const totalQuantite = panierStocke.reduce((total, item) => total + item.quantite, 0);
    setPanierQuantite(totalQuantite);
  };

  // Fonction pour ajouter un produit au panier
  const ajouterAuPanier = (produit) => {
    const panierMiseAJour = [...panier];
    const index = panierMiseAJour.findIndex((item) => item.id === produit.id);

    if (index !== -1) {
      // Si le produit existe déjà, augmenter la quantité
      panierMiseAJour[index].quantite += 1;
    } else {
      // Sinon, ajouter un nouveau produit avec une quantité de 1
      panierMiseAJour.push({ ...produit, quantite: 1 });
    }

    // Mettre à jour le state et sauvegarder
    mettreAJourPanier(panierMiseAJour);
  };

  // Fonction pour supprimer un produit du panier
  const supprimerDuPanier = (id) => {
    const panierMiseAJour = panier.filter((item) => item.id !== id);
    mettreAJourPanier(panierMiseAJour);
  };

  // Fonction générique pour mettre à jour le panier
  const mettreAJourPanier = (nouveauPanier) => {
    setPanier(nouveauPanier);

    // Mettre à jour la quantité totale
    const totalQuantite = nouveauPanier.reduce((total, item) => total + item.quantite, 0);
    setPanierQuantite(totalQuantite);

    // Sauvegarder dans localStorage
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
  };

  // Charger le panier au premier rendu
  useEffect(() => {
    chargerPanierDepuisLocalStorage();
  }, []);

  return (
    <PanierContext.Provider 
      value={{ 
        panier, 
        setPanier: mettreAJourPanier,
        panierQuantite, 
        ajouterAuPanier, 
        supprimerDuPanier 
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};