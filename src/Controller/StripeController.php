<?php

namespace App\Controller;

use App\Entity\Produit;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;
use Stripe\Checkout\Session;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class StripeController extends AbstractController
{
    private ?StripeClient $stripe = null;

    public function __construct(
        private readonly string $stripeSecretKey,
        private readonly string $successUrl,
        private readonly LoggerInterface $logger,
        private readonly EntityManagerInterface $entityManager
    ) {
    }

    /**
     * Crée une session de paiement Stripe
     *
     * @param Request $request Requête contenant les données du panier
     * @return JsonResponse
     *
     * @throws BadRequestHttpException Si le panier est vide ou invalide
     */
    #[Route('/api/stripe/checkout-session', name: 'create_checkout_session', methods: ['POST'])]
    public function createCheckoutSession(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['items']) || !is_array($data['items'])) {
                throw new BadRequestHttpException('Les éléments du panier sont requis.');
            }

            // Récupération et validation des éléments du panier
            $cartItems = array_map(function ($item) {
                if (!isset($item['productId'], $item['quantity'])) {
                    throw new BadRequestHttpException('Chaque élément du panier doit contenir un productId et une quantité.');
                }

                $product = $this->entityManager->getRepository(Produit::class)->find($item['productId']);

                if (!$product) {
                    throw new BadRequestHttpException("Produit avec l'ID {$item['productId']} introuvable.");
                }

                // Validation du prix du produit
                if ($product->getPrix() <= 0) {
                    throw new BadRequestHttpException("Le produit {$product->getNom()} doit avoir un prix valide.");
                }

                return [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                ];
            }, $data['items']);

            // Création des lignes de paiement
            $lineItems = array_map(function ($item) {
                $product = $item['product'];
                
                return [
                    'price_data' => [
                        'currency' => 'EUR', // Devise utilisée
                        'unit_amount' => $product->getPrix() * 100, // Conversion du prix en centimes
                        'product_data' => [
                            'name' => $product->getNom(),
                            'description' => $product->getDescription(),
                        ],
                    ],
                    'quantity' => $item['quantity'], // Quantité
                ];
            }, $cartItems);

            // Création de la session de paiement avec Stripe
            $session = $this->getStripe()->checkout->sessions->create([
                'line_items' => $lineItems,
                'mode' => 'payment', // Mode de paiement
                'success_url' => $this->successUrl, // URL de succès
                'cancel_url' => $this->successUrl . '?canceled=true', // URL d'annulation
            ]);

            $this->logger->info('Session de paiement Stripe créée avec succès', [
                'session_id' => $session->id
            ]);

            return $this->json([
                'url' => $session->url,
                'session_id' => $session->id
            ]);
        } catch (ApiErrorException $e) {
            $this->logger->error('Erreur Stripe lors de la création de la session', [
                'error' => $e->getMessage()
            ]);

            return $this->json([
                'error' => 'Une erreur est survenue lors de la création de la session de paiement'
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);

        } catch (\Exception $e) {
            $this->logger->error('Erreur inattendue', [
                'error' => $e->getMessage()
            ]);

            return $this->json([
                'error' => 'Une erreur inattendue est survenue'
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Obtient ou initialise le client Stripe
     *
     * @return StripeClient
     */
    private function getStripe(): StripeClient
    {
        return $this->stripe ??= new StripeClient($this->stripeSecretKey);
    }
}
