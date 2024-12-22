<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserController extends AbstractController
{
    // Route pour obtenir les données utilisateur
    #[Route('/api/users', name: 'get_user_data', methods: ['GET'])] 
    public function getUserData(Request $request): JsonResponse
    {
        try {
            // Récupérer le token de l'en-tête Authorization
            $authHeader = $request->headers->get('Authorization');
            if (!$authHeader || !preg_match('/^Bearer\s(.+)$/', $authHeader, $matches)) {
                return new JsonResponse(['error' => 'Token manquant ou invalide'], JsonResponse::HTTP_UNAUTHORIZED);
            }

            $token = $matches[1];

            // Symfony se charge automatiquement de vérifier le token et de récupérer l'utilisateur
            $user = $this->getUser();

            // Vérifier si un utilisateur est authentifié
            if (!$user instanceof User) {
                throw new AuthenticationException('Utilisateur non authentifié');
            }

            // Transformer l'utilisateur en tableau de données
            $data = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'nom' => $user->getNom(),
                'prenom' => $user->getPrenom(),
                'adresse_postal' => $user->getAdressePostal(),
            ];

            return $this->json($data);
        } catch (AuthenticationException $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return new JsonResponse([ 
                'error' => 'Une erreur est survenue lors de la récupération des informations utilisateur.',
                'details' => $e->getMessage(),
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Route pour mettre à jour les informations de l'utilisateur avec un ID
    #[Route('/api/users/{id}', name: 'update_user', methods: ['PUT'])] 
    public function updateUser(int $id, Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            // Récupérer l'utilisateur à partir de l'ID
            $user = $entityManager->getRepository(User::class)->find($id);

            if (!$user) {
                return new JsonResponse(['error' => 'Utilisateur non trouvé'], JsonResponse::HTTP_NOT_FOUND);
            }

            // Récupérer les données envoyées dans la requête
            $data = json_decode($request->getContent(), true);
            $oldPassword = $data['old_password'] ?? null;
            $newPassword = $data['new_password'] ?? null;
            $newEmail = $data['email'] ?? null;
            $newNom = $data['nom'] ?? null;
            $newPrenom = $data['prenom'] ?? null;
            $newAdressePostal = $data['adresse_postal'] ?? null;

            // Si un mot de passe est fourni, vérifier l'ancien mot de passe
            if ($oldPassword && $newPassword) {
                // Vérifier que l'ancien mot de passe est correct
                if (!$passwordHasher->isPasswordValid($user, $oldPassword)) {
                    return new JsonResponse(['error' => 'L\'ancien mot de passe est incorrect.'], JsonResponse::HTTP_BAD_REQUEST);
                }

                // Encoder le nouveau mot de passe
                $encodedPassword = $passwordHasher->hashPassword($user, $newPassword);
                $user->setPassword($encodedPassword);
            }

            // Mettre à jour les autres informations de l'utilisateur (email, nom, prénom, adresse)
            if ($newEmail) {
                $user->setEmail($newEmail);
            }
            if ($newNom) {
                $user->setNom($newNom);
            }
            if ($newPrenom) {
                $user->setPrenom($newPrenom);
            }
            if ($newAdressePostal) {
                $user->setAdressePostal($newAdressePostal);
            }

            // Enregistrer les modifications
            $entityManager->flush();

            return new JsonResponse(['message' => 'Les informations utilisateur ont été mises à jour avec succès.'], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse([ 
                'error' => 'Une erreur est survenue lors de la mise à jour des informations utilisateur.',
                'details' => $e->getMessage(),
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
