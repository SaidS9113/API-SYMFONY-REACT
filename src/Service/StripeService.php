<?php

namespace App\Service;

use Stripe\PaymentIntent;
use Stripe\Stripe;

class StripeService
{
    public function __construct(string $stripeSecretKey)
    {
        Stripe::setApiKey($stripeSecretKey);
    }

    public function createPaymentIntent(int $amount, string $currency): PaymentIntent
    {
        return PaymentIntent::create([
            'amount' => $amount,
            'currency' => $currency,
            'automatic_payment_methods' => [
                'enabled' => true,
            ],
        ]);
    }
}
