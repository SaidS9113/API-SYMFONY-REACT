<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\NewsletterSubscriber;

class NewsletterController extends AbstractController
{
    #[Route('/api/newsletter', name: 'subscribe_newsletter', methods: ['POST'])]
    public function subscribe(Request $request, MailerInterface $mailer, EntityManagerInterface $em): Response
    {
        // Récupérer les données JSON envoyées par la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si l'email est présent dans les données
        if (empty($data['email'])) {
            return $this->json(['error' => 'L\'email est requis'], Response::HTTP_BAD_REQUEST);
        }

        $email = $data['email'];

        // Validation de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'Email invalide'], Response::HTTP_BAD_REQUEST);
        }

        // Vérifier si l'email est déjà inscrit
        $existingSubscriber = $em->getRepository(NewsletterSubscriber::class)->findOneBy(['email' => $email]);
        if ($existingSubscriber) {
            return $this->json(['error' => 'Cet email est déjà inscrit à la newsletter'], Response::HTTP_CONFLICT);
        }

        // Créer une nouvelle entité NewsletterSubscriber
        $subscriber = new NewsletterSubscriber();
        $subscriber->setEmail($email);

        try {
            $em->persist($subscriber);
            $em->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de l\'enregistrement'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Créer un email de confirmation
        $confirmationEmail = (new Email())
            ->from('soidroudinesaid51@gmail.com') // Votre email d'envoi
            ->to($email)
            ->subject('Confirmation d\'inscription à la newsletter')
            ->text('Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières nouvelles et mises à jour.');

        // Envoyer l'email via Symfony Mailer
        try {
            $mailer->send($confirmationEmail);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de l\'envoi de l\'email'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Retourner une réponse de succès
        return $this->json(['success' => 'Inscription réussie. Un email de confirmation a été envoyé.']);
    }
}
