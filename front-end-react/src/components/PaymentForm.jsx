import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('votre_cle_publique_stripe');

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Remplacez par l'URL de votre API Symfony
      const response = await axios.post('votre_api_symfony/create-payment-intent', {
        amount: 1000, // montant en centimes
        currency: 'eur'
      });

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Paiement</h2>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Chargement...' : 'Payer maintenant'}
      </button>
    </div>
  );
}