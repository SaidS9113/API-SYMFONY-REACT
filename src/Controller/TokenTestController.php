<?php

namespace App\Controller;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TokenTestController
{
    #[Route('/api/test-token', name: 'api_test_token', methods: ['GET'])]
    public function testToken(JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        // Créer un utilisateur fictif pour tester
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword('dummy'); // Pas important ici
        $user->setRoles(['ROLE_USER']);

        // Générer le token pour cet utilisateur
        $token = $jwtManager->create($user);

        return new JsonResponse(['token' => $token]);
    }
}
