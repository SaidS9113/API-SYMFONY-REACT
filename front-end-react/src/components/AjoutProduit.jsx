import React, { useState, useEffect } from 'react';
import api from '../api'; 

function AjoutProduitForm() {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        categorie: '',
    });

    const [categories, setCategories] = useState([]); 
    const [message, setMessage] = useState('');

    
    useEffect(() => {
        api.get('/categories')
            .then((response) => {
                setCategories(response.data['member']); 'hydra:member'
            })
            .catch((error) => {
                console.error('Erreur lors du chargement des catégories', error);
                setMessage('Erreur lors du chargement des catégories.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Valider les champs requis
        if (!formData.nom || !formData.prix || !formData.categorie) {
            setMessage('Nom, prix et catégorie sont requis.');
            return;
        }

        api.post('/add-product', {
            nom: formData.nom,
            description: formData.description,
            prix: parseFloat(formData.prix),
            categorie: formData.categorie, 
        })
        .then((response) => {
            setMessage('Produit ajouté avec succès !');
            setFormData({ nom: '', description: '', prix: '', categorie: '' }); 
        })
        .catch((error) => {
            console.error(error);
            setMessage('Erreur lors de l’ajout du produit.');
        });
    };

    return (
        <div>
            <h2>Ajouter un Produit</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description :</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Prix (€) :</label>
                    <input
                        type="number"
                        name="prix"
                        value={formData.prix}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
    <label>Catégorie :</label>
    <select
        name="categorie"
        value={formData.categorie}
        onChange={handleChange}
        required
    >
        <option value="">Sélectionnez une catégorie</option>
        {categories && categories.length > 0 && categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.nom}
            </option>
        ))}
    </select>
</div>
                <button type="submit">Ajouter le Produit</button>
            </form>
        </div>
    );
}

export default AjoutProduitForm;
