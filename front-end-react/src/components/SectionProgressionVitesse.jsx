import React, { useEffect, useState, useRef } from "react";

function SectionProgressionVitesse() {
    const [progress, setProgress] = useState({});
    const sectionRef = useRef(null); // Référence à la section
    const carData = [
        { name: "Bugatti", speed: 420 },
        { name: "Porsche", speed: 308 },
        { name: "BMW", speed: 250 },
        { name: "Toyota", speed: 100 },
    ];

    // Fonction pour interpoler la couleur entre vert et rouge selon la vitesse
    const interpolateColor = (percentage) => {
        const green = Math.min(255, (1 - percentage / 100) * 255);
        const red = Math.min(255, (percentage / 100) * 255);
        return `rgb(${red}, ${green}, 0)`; // Couleur entre vert et rouge
    };

    // Observer pour détecter quand la section devient visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    // Démarrer l'animation lorsque la section est visible
                    const maxSpeed = Math.max(...carData.map(c => c.speed));
                    carData.forEach(car => {
                        const percentage = (car.speed / maxSpeed) * 100;
                        setProgress(prev => ({ ...prev, [car.name]: 0 }));

                        setTimeout(() => {
                            setProgress(prev => ({ ...prev, [car.name]: percentage }));
                        }, 100);
                    });
                }
            },
            { threshold: 0.5 } // Déclencher l'animation lorsque 50% de la section est visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div ref={sectionRef} className="bg-[#111111] flex flex-col items-center text-white py-5 pt-[100px]">
            <h2 className="text-4xl font-bold mb-8 text-center pr-[20px] pl-[20px]">
                Vitesse des véhicules
            </h2>
            <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-[70px] pt-[40px]">
                {carData.map((car, index) => {
                    const progressPercentage = progress[car.name] || 0;
                    const color = interpolateColor(progressPercentage);
                    
                    return (
                        <div key={index} className="relative">
                            <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    fill="none"
                                    stroke="#222"
                                    strokeWidth="8"
                                    className="transform"
                                />
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    fill="none"
                                    stroke={color} // Appliquer la couleur dynamique
                                    strokeWidth="8"
                                    strokeDasharray={`calc(${progressPercentage * 2.827}px) 1000`} // Progrès circulaire
                                    className="transform transition-all duration-[3000ms] ease-out" // Ralentir l'animation
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                                    {car.speed} km/h
                                </p>
                                <p className="mt-2 text-base sm:text-lg md:text-xl font-semibold">
                                    {car.name}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SectionProgressionVitesse;
