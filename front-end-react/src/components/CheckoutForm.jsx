import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierStocke);
  }, []);

  const calculerSousTotal = () => {
    return panier.reduce((total, item) => total + item.prix * item.quantite, 0).toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

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

    const montantTotal = calculerSousTotal() * 100;

    const response = await fetch("api/stripe/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: panier.map(item => ({
          productId: item.id,
          quantity: item.quantite
        })),
      }),
    });

    const result = await response.json();

    if (result.error) {
      alert("Erreur lors de la création de la session : " + result.error);
      setLoading(false);
    } else {
      window.location.href = result.url;
    }
  };

  const paymentRequest = stripe && stripe.paymentRequest({
    country: 'FR',
    currency: 'eur',
    total: {
      label: 'Total',
      amount: calculerSousTotal() * 100,
    },
    requestPayerName: true,
    requestPayerEmail: true,
  });

  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.canMakePayment().then((result) => {
        setCanMakePayment(result);
      });
    }
  }, [paymentRequest]);

  const getImageUrl = (imageUrl) => {
    if (imageUrl && imageUrl.startsWith("/uploads")) {
      return `${BASE_URL}${imageUrl}`;
    }
    return imageUrl;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[70px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Finaliser votre commande</h1>
          <p className="text-lg text-white">Vérifiez vos articles et complétez votre paiement en toute sécurité</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Order summary */}
            <div className="lg:w-1/2 bg-gray-50 p-8">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Résumé de la commande</h2>
              </div>

              <div className="space-y-4 mb-8">
                {panier.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-0">
                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.nom}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.nom}</h3>
                      <p className="text-gray-500">Quantité: {item.quantite}</p>
                      <p className="text-gray-900 font-medium">{(item.prix * item.quantite).toFixed(2)} €</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-medium text-gray-900">
                  <span>Total</span>
                  <span>{calculerSousTotal()} €</span>
                </div>
              </div>
            </div>

            {/* Right side - Payment form */}
            <div className="lg:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Paiement sécurisé</h2>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                  <span>Vos données de paiement sont sécurisées</span>
                </div>

                {canMakePayment ? (
                  <PaymentRequestButtonElement
                    options={{
                      style: {
                        paymentRequestButton: {
                          type: 'default',
                          theme: 'dark',
                          height: '48px',
                        },
                      },
                    }}
                  />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-md border border-gray-300 p-4">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!stripe || loading}
                      className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Traitement en cours...
                        </span>
                      ) : (
                        `Payer ${calculerSousTotal()} €`
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;