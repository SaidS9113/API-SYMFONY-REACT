<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\MessageContact; // Assurez-vous que l'entité est correctement importée

class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'send_contact_message', methods: ['POST'])]
    public function sendMessage(Request $request, MailerInterface $mailer, EntityManagerInterface $em): Response
    {
        // Récupérer les données JSON envoyées par la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier si les données sont bien présentes et valides
        if (empty($data['email']) || empty($data['message'])) {
            return $this->json(['error' => 'Email et message sont requis'], Response::HTTP_BAD_REQUEST);
        }

        // Récupérer les données du formulaire
        $email = $data['email'];
        $message = $data['message'];

        // Validation de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'Email invalide'], Response::HTTP_BAD_REQUEST);
        }

        // Créer l'entité MessageContact pour enregistrer les données dans la base de données
        $contactMessage = new MessageContact();
        $contactMessage->setEmail($email);
        $contactMessage->setMessage($message);

        try {
            $em->persist($contactMessage);
            $em->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de l\'enregistrement du message'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Créer l'email pour notifier l'administrateur
        $emailMessage = (new Email())
            ->from($email) // L'email de l'utilisateur
            ->to('soidroudinesaid51@gmail.com') // L'adresse email où vous voulez recevoir le message
            ->subject('Nouveau message de contact')
            ->text("Message reçu de : $email\n\n$message"); // Le contenu du message

        // Envoyer l'email via Symfony Mailer
        try {
            $mailer->send($emailMessage);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de l\'envoi de l\'email'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // Retourner une réponse après l'envoi du message
        return $this->json(['success' => 'Message envoyé avec succès']);
    }
}
