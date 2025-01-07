import React, { useState, useEffect } from 'react';
import AjoutCategorie from './AjoutCategorie';
import api from '../api';

function AjoutProduit() {
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        categorie: '',
        image_url: null,  // Le fichier image est stocké ici
    });

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // Pour l'aperçu de l'image

    useEffect(() => {
        // Charger les catégories au début
        api.get('/categories')
            .then((response) => setCategories(response.data['member']))
            .catch((error) => {
                console.error('Erreur lors du chargement des catégories', error);
                setMessage('Erreur lors du chargement des catégories.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image_url: file }));
            setImagePreview(URL.createObjectURL(file));  // Créer un aperçu de l'image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nom, prix, categorie, description, image_url } = formData;

        if (!nom || !prix || !categorie) {
            setMessage('Nom, prix et catégorie sont requis.');
            return;
        }

        try {
            // 1. Ajouter le produit sans l'image
            const productResponse = await api.post('/add-product', {
                nom,
                description,
                prix: parseFloat(prix),
                categorie,
            });

            if (image_url && productResponse.data.id) {
                // 2. Si une image est présente, l'envoyer
                const formDataImage = new FormData();
                formDataImage.append('image_url', image_url);  // Ajouter le fichier image

                await api.post(
                    `/add-product/${productResponse.data.id}/image_url`,
                    formDataImage,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
            }

            setMessage('Produit ajouté avec succès !');
            setFormData({ nom: '', description: '', prix: '', categorie: '', image_url: null });
            setImagePreview(null);  // Réinitialiser l'aperçu de l'image
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit.', error);
            setMessage('Erreur lors de l\'ajout du produit.');
        }
    };

    const handleCategorieAdded = (nouvelleCategorie) => {
        setCategories((prev) => [...prev, nouvelleCategorie]);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un Produit</h2>
            {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 max-w-lg mx-auto">
                {[ 
                    { label: 'Nom', type: 'text', name: 'nom', value: formData.nom, required: true },
                    { label: 'Description', type: 'textarea', name: 'description', value: formData.description },
                    { label: 'Prix (€)', type: 'number', name: 'prix', value: formData.prix, required: true },
                ].map(({ label, type, name, value, required }) => (
                    <div key={name} className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">{label} :</label>
                        {type === 'textarea' ? (
                            <textarea
                                name={name}
                                value={value}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={value}
                                onChange={handleChange}
                                required={required}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        )}
                    </div>
                ))}
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Catégorie :</label>
                    <select
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nom}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Section pour l'image */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image :</label>
                    <input
                        type="file"
                        name="image_url"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Prévisualisation" className="max-w-xs mx-auto" />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Ajouter le Produit
                    </button>
                </div>
            </form>

            <AjoutCategorie onCategorieAdded={handleCategorieAdded} />
        </div>
    );
}

export default AjoutProduit;
