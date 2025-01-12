import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    // Récupérer les produits du panier depuis localStorage
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierStocke);
  }, []);

  const calculerSousTotal = () => {
    return panier.reduce((total, item) => total + item.prix * item.quantite, 0).toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    // Créez une méthode de paiement avec Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la création du paiement.");
      setLoading(false);
      return;
    }

    // Calculer le montant total du panier (en centimes)
    const montantTotal = calculerSousTotal() * 100; // Convertir en centimes

    // Envoyez le paymentMethod.id et le montant au backend Symfony
    const response = await fetch("http://localhost:8000/api/process-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: montantTotal,
      }),
    });

    const result = await response.json();

    if (result.error) {
      alert("Erreur de paiement : " + result.error);
      setLoading(false);
    } else {
      alert("Paiement réussi !");
      // Vider le panier après un paiement réussi
      localStorage.removeItem("panier");
      setPanier([]);
      setLoading(false);
    }
  };

  // Créer l'objet paymentRequest
  const paymentRequest = stripe && stripe.paymentRequest({
    country: 'FR',
    currency: 'eur',
    total: {
      label: 'Total',
      amount: calculerSousTotal() * 100, // En centimes
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });

  // Options pour le PaymentRequestButtonElement
  const prButtonOptions = {
    style: {
      paymentRequestButton: {
        type: 'pay',
        theme: 'dark',
        height: '64px',
      },
    },
  };

  // Vérifier si le paymentRequest est prêt avant d'afficher le PaymentRequestButtonElement
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.canMakePayment().then((result) => {
        setCanMakePayment(result);
      });
    }
  }, [paymentRequest]);

  // Afficher le PaymentRequestButtonElement si possible
  const prButton = canMakePayment ? (
    <PaymentRequestButtonElement options={prButtonOptions} />
  ) : null;

  // Fonction pour déterminer l'URL correcte de l'image
  const getImageUrl = (imageUrl) => {
    if (imageUrl && imageUrl.startsWith("/uploads")) {
      return `${BASE_URL}${imageUrl}`;
    }
    return imageUrl;
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center mt-10">Paiement</h1>
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row gap-5">
        
        {/* Section des informations du produit */}
        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
          {/* Afficher les produits du panier */}
          <div className="mb-4">
            {panier.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4"> {/* Utilisation de justify-between */}
                {/* Utiliser l'URL correcte pour l'image */}
                <div className="flex">
                  <img
                    src={getImageUrl(item.imageUrl)} // L'image est récupérée directement à partir du localStorage
                    alt={item.nom}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold mb-2">{item.nom}</span> {/* Ajout du gap entre le nom et le prix */}
                    <span>{item.prix} € x {item.quantite}</span>
                  </div>
                </div>
                <span className="font-semibold">{(item.prix * item.quantite).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-600 mb-4 text-center">Sous-total : {calculerSousTotal()} €</p>
        </div>

        {/* Section du formulaire de paiement */}
        <div className="lg:w-1/2 w-full">
          {/* Affichage du bouton de paiement avec Stripe */}
          {prButton ? (
            <div className="mb-4">{prButton}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": {
                          color: "#a0aec0",
                        },
                        padding: "10px",
                      },
                      complete: {
                        color: "#2c7f6d",
                      },
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Chargement..." : "Payer"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;
