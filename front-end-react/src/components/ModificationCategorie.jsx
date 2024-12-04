import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ModificationCategorie() {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger les informations de la catégorie
    useEffect(() => {
        fetch(`http://localhost:8000/api/categorie}`) // Remplacez par l'URL de votre API
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setNom(data.nom); // Pré-remplit le champ avec le nom de la catégorie
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    // Gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/api/categorie/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nom }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la modification de la catégorie.");
                }
                alert("Catégorie modifiée avec succès !");
                navigate("/"); // Redirection après la modification
            })
            .catch((error) => {
                alert(`Erreur : ${error.message}`);
            });
    };

    if (loading) return <p className="text-center">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Modifier la catégorie</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="nom"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Nom de la catégorie
                        </label>
                        <input
                            id="nom"
                            name="nom"
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Enregistrer
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-blue-500 hover:text-blue-800 font-bold py-2 px-4"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModificationCategorie;
