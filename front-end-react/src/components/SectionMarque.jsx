import React from "react";
import bugatti from "../assets/img/bugatti-marque.png";
import porshe from "../assets/img/porshe-marque.png";
import bmw from "../assets/img/bmw-marque.png";
import toyota from "../assets/img/toyota-marque.png";

function SectionMarque() {
    const brands = [
        { id: 1, name: "Marque 1", image: bugatti },
        { id: 2, name: "Marque 2", image: porshe },
        { id: 3, name: "Marque 3", image: bmw },
        { id: 4, name: "Marque 4", image: toyota },
    ];

    return (
        <div className="bg-[#111111] flex flex-col items-center text-white py-5 pt-[80px]">
            <h2 className="text-4xl font-bold mb-10 text-center pr-[20px] pl-[20px]">Nos Marques</h2>
            <div className="w-full lg:w-[80%] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center pt-[30px] pr-[20px] pl-[20px]">
                {brands.map((brand) => (
                    <div
                        key={brand.id}
                        className="relative p-4 rounded-lg shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-500"
                    >
                        <img
                            src={brand.image}
                            alt={brand.name}
                            className={`w-full h-full object-contain 
                                ${brand.name === "Marque 1" ? "lg:w-64 lg:h-64 sm:w-56 sm:h-56" : ""}
                                ${brand.name === "Marque 3" ? "lg:w-64 lg:h-64 sm:w-56 sm:h-56" : ""}
                                ${brand.name !== "Marque 1" && brand.name !== "Marque 3" ? "lg:w-48 lg:h-48 sm:w-40 sm:h-40" : ""}
                            `}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SectionMarque;
