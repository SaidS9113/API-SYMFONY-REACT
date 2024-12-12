<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController
{
    #[Route('/login_check', name: 'login_check', methods: ['POST'])]
    public function loginCheck(): JsonResponse
    {
        throw new \RuntimeException('This method should not be called directly. LexikJWTAuthenticationBundle handles the login process.');
    }

    #[Route('/profile', name: 'profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user || !$user instanceof User) {
            return $this->json(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }
}
