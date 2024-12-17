<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        // Récupérer les données envoyées en JSON
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'], $data['password_confirmation'])) {
            return new JsonResponse(['error' => "L'email et le mot de passe sont nécessaires !"], Response::HTTP_BAD_REQUEST);
        }

        if ($data['password'] !== $data['password_confirmation']) {
            return new JsonResponse(['error' => "Le mot de passe n'est pas identique !"], Response::HTTP_BAD_REQUEST);
        }

        // Vérifier si l'utilisateur existe déjà
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['error' => "L'utilisateur existe, veuillez vous connecté !"], Response::HTTP_CONFLICT);
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setEmail($data['email']);

        // Hash du mot de passe
        $user->setPassword($userPasswordHasher->hashPassword($user, $data['password']));

        // Attribuer un rôle à l'utilisateur
        $user->setRoles(['ROLE_USER']);

        // Enregistrer l'utilisateur dans la base de données
        $entityManager->persist($user);
        $entityManager->flush();

        // Retourner une réponse JSON de succès
        return new JsonResponse(['message' => 'Félicitations, vous êtes inscrit !'], Response::HTTP_CREATED);
    }
}
