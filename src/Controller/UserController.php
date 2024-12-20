<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class UserController extends AbstractController
{
    #[Route('/api/users', name: 'app_user', methods: ['GET'])]
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
}
