<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Entity\Produit;

class StripeController
{
    private $em;
    private $logger;

    public function __construct(EntityManagerInterface $em, LoggerInterface $logger)
    {
        $this->em = $em;
        $this->logger = $logger;
        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);
    }

    #[Route('/api/process-payment', methods: ['POST'])]
    public function processPayment(Request $request): JsonResponse
    {
        try {
            // Récupérer et décoder les données JSON
            $content = json_decode($request->getContent(), true);
            $this->logger->info('Données reçues:', ['content' => $content]);

            if (!isset($content['items']) || !isset($content['amount'])) {
                throw new \Exception('Données de paiement manquantes');
            }

            $items = $content['items'];
            $clientAmount = (int)$content['amount'];

            // Calculer le montant total côté serveur
            $serverAmount = 0;
            foreach ($items as $item) {
                if (!isset($item['id'], $item['prix'], $item['quantite'])) {
                    throw new \Exception('Données d\'article invalides');
                }

                // Vérifier que le produit existe
                $product = $this->em->getRepository(Produit::class)->find($item['id']);
                if (!$product) {
                    throw new \Exception('Produit non trouvé: ' . $item['id']);
                }

                // Convertir et normaliser les valeurs numériques
                $prix = (float)number_format((float)$item['prix'], 2, '.', '');
                $quantite = (int)$item['quantite'];

                // Calculer le sous-total pour cet article
                $itemTotal = $prix * $quantite;
                $serverAmount += $itemTotal;
            }

            // Convertir le montant total en centimes
            $serverAmount = (int)round($serverAmount * 100);

            $this->logger->info('Comparaison des montants:', [
                'clientAmount' => $clientAmount,
                'serverAmount' => $serverAmount
            ]);

            // Vérifier que les montants correspondent
            if ($serverAmount !== $clientAmount) {
                throw new \Exception('Le montant total ne correspond pas');
            }

            // Créer le PaymentIntent
            $intent = PaymentIntent::create([
                'amount' => $serverAmount,
                'currency' => 'eur',
                'payment_method_types' => ['card'],
                'confirmation_method' => 'manual',
            ]);

            return new JsonResponse([
                'success' => true,
                'clientSecret' => $intent->client_secret
            ]);

        } catch (\Exception $e) {
            $this->logger->error('Erreur de paiement:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return new JsonResponse([
                'error' => $e->getMessage()
            ], 400);
        }
    }
}