import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/img/porsheProduct.webp";
import Image2 from "../assets/img/bugattiProduct.jpg";  // Ajoutez ici l'URL de votre deuxième image
import Image3 from "../assets/img/ToyotaProduct.jpg";  // Ajoutez ici l'URL de votre troisième image
import SectionProduit from "./SectionProduit";

function Accueil() {
    // État pour l'image du carrousel
    const [currentImage, setCurrentImage] = useState(0);

    const images = [image1, Image2, Image3];  // Liste des images du carrousel

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 2500);  // Changer l'image toutes les 3 secondes

        // Nettoyage de l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            {/* Bannière */}
            <div
                className="relative h-[100vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${images[currentImage]})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Bienvenue sur notre site Véhicule</h1>
                        <p className="text-lg sm:text-xl mb-6">Découvrez les véhicules les plus célèbres au monde.</p>
                        <Link to="/boutique" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            En savoir plus
                        </Link>
                    </div>
                </div>
            </div>
            <SectionProduit />
        </div>
    );
}

export default Accueil;
