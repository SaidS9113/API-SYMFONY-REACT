import React from "react";
import BChiron from "../assets/img/B-chiron.webp"; 

function Accueil() {
    return (
        <div className="relative">
            {/* Bannière */}
            <div
                className="relative h-[80vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${BChiron})` }}
            >
                                {/* Superposition de contenu */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Bienvenue sur notre site Véhicule</h1>
                        <p className="text-lg sm:text-xl mb-6">Découvrez les véhicules les plus célèbres au monde.</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            En savoir plus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Accueil;
