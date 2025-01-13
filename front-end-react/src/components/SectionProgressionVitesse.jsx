import React, { useState, useEffect } from "react";

function SectionProgressionVitesse() {
    const [percentages, setPercentages] = useState([50, 85, 100, 100]); // Pourcentages de progression

    // Simule l'augmentation des pourcentages lors du défilement
    useEffect(() => {
        const handleScroll = () => {
            setPercentages((prev) =>
                prev.map((value) => (value < 100 ? value + 1 : value)) // Limite la progression à 100%
            );
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fonction pour calculer la couleur en fonction de la vitesse
    const getColor = (car) => {
        const minSpeed = Math.min(...carData.map(c => c.speed));
        const maxSpeed = Math.max(...carData.map(c => c.speed));

        if (car.speed === minSpeed) return "text-green-500 border-green-500";
        if (car.speed === maxSpeed) return "text-red-500 border-red-500";
        return "text-orange-500 border-orange-500";
    };

    // Données des voitures
    const carData = [
        { name: "Bugatti", speed: 420, percentage: percentages[0] }, // La plus rapide
        { name: "Porsche", speed: 308, percentage: percentages[1] }, // Vitesse normale
        { name: "BMW", speed: 250, percentage: percentages[2] }, // Vitesse normale
        { name: "Toyota", speed: 100, percentage: percentages[3] }, // La plus lente
    ];

    return (
        <div className="bg-[#111111] min-h-screen flex flex-col justify-center items-center text-white py-10">
            <h2 className="text-4xl font-bold mb-10 text-center">Vitesse des véhicules</h2>
            <div className="w-full sm:w-full lg:w-[80%] flex flex-wrap justify-center gap-8"> {/* Conteneur centré avec flex */}
                {carData.map((car, index) => {
                    // Déterminer la progression en fonction de la vitesse
                    let progressPercentage;
                    if (car.speed === 100) {
                        progressPercentage = 50; // La voiture la plus lente (Toyota) est remplie à 50%
                    } else if (car.speed === 420) {
                        progressPercentage = 100; // La voiture la plus rapide (Bugatti) est remplie à 100%
                    } else {
                        progressPercentage = 85; // Les autres voitures sont remplies à 85%
                    }

                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-8 ${getColor(
                                car
                            )} transition-all duration-500`}
                            style={{
                                // Progrès de la couleur du cercle selon la progression en degrés
                                background: `conic-gradient(${getColor(
                                    car
                                ).split(" ")[0]} ${progressPercentage * 3.6}deg, #222 ${progressPercentage * 3.6}deg)`, // Gradient de la progression
                            }}
                        >
                            <div className="text-center">
                                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{car.speed} km/h</p>
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">{car.name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SectionProgressionVitesse;
