<?php

namespace App\Controller;

use App\Entity\Payment;
use App\Service\StripeService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Stripe\Exception\ApiErrorException;

#[Route('/api', name: 'api_')]
class PaymentController extends AbstractController
{
    public function __construct(
        private StripeService $stripeService,
        private EntityManagerInterface $entityManager
    ) {}

    #[Route('/create-payment-intent', name: 'create_payment_intent', methods: ['POST'])]
    public function createPaymentIntent(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $amount = $data['amount'] ?? 0;

            if ($amount <= 0) {
                return $this->json(['error' => 'Invalid amount'], Response::HTTP_BAD_REQUEST);
            }

            $paymentIntent = $this->stripeService->createPaymentIntent($amount);

            return $this->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (ApiErrorException $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/webhook', name: 'stripe_webhook', methods: ['POST'])]
    public function handleWebhook(Request $request): Response
    {
        $event = null;
        try {
            $event = $this->stripeService->constructEventFromPayload(
                $request->getContent(),
                $request->headers->get('Stripe-Signature')
            );
        } catch (\Exception $e) {
            return new Response('Webhook error: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        // Handle the event
        switch ($event->type) {
            case 'payment_intent.succeeded':
                $paymentIntent = $event->data->object;
                
                // Create a new payment record
                $payment = new Payment();
                $payment->setStripePaymentId($paymentIntent->id);
                $payment->setAmount($paymentIntent->amount);
                $payment->setStatus('completed');
                $payment->setCreatedAt(new \DateTime());
                
                $this->entityManager->persist($payment);
                $this->entityManager->flush();
                break;
                
            case 'payment_intent.payment_failed':
                $paymentIntent = $event->data->object;
                
                // Log the failed payment
                $payment = new Payment();
                $payment->setStripePaymentId($paymentIntent->id);
                $payment->setAmount($paymentIntent->amount);
                $payment->setStatus('failed');
                $payment->setCreatedAt(new \DateTime());
                
                $this->entityManager->persist($payment);
                $this->entityManager->flush();
                break;
        }

        return new Response('Webhook handled', Response::HTTP_OK);
    }

    #[Route('/payment-status/{paymentId}', name: 'payment_status', methods: ['GET'])]
    public function getPaymentStatus(string $paymentId): JsonResponse
    {
        try {
            $status = $this->stripeService->getPaymentStatus($paymentId);
            return $this->json(['status' => $status]);
        } catch (ApiErrorException $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/payments', name: 'get_payments', methods: ['GET'])]
    public function getPayments(): JsonResponse
    {
        $payments = $this->entityManager->getRepository(Payment::class)->findBy(
            [],
            ['createdAt' => 'DESC']
        );

        $paymentsData = array_map(function ($payment) {
            return [
                'id' => $payment->getId(),
                'stripePaymentId' => $payment->getStripePaymentId(),
                'amount' => $payment->getAmount(),
                'status' => $payment->getStatus(),
                'createdAt' => $payment->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $payments);

        return $this->json($paymentsData);
    }
}