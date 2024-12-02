import React, { useState, useEffect } from 'react';
import api from '../api'; 

function ListeProduit() {
    const [produits, setProduits] = useState([]); 

    useEffect(() => {
        api.get('/produits')
            .then(response => {
                console.log("Réponse API complète :", response.data);
                const produitsData = response.data['member'] || []; 
                setProduits(produitsData);
                console.log("Produits récupérés :", produitsData);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des produits :", error);
            });
    }, []);
        return (
            <div>
                <h1>Liste des produits</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Prix (€)</th>
                            <th>Catégorie</th>
                            <th>Date de création</th>
                        </tr>
                    </thead>
                    <tbody>
                    {produits.length > 0 ? (
                        produits.map(produit => (
                            <tr key={produit.id}>
                                <td>{produit.id}</td>
                                <td>{produit.nom}</td>
                                <td>{produit.description}</td>
                                <td>{produit.prix}</td>
                                <td>{produit.categorie.nom || "Non défini"}</td>
                                <td>{produit.dateCreation ? new Date(produit.dateCreation).toLocaleDateString() : "Non disponible"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Aucun produit trouvé.</td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        );
    }
    export default ListeProduit;
