<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController
{
    private $jwtManager;
    private $userProvider;

    public function __construct(JWTTokenManagerInterface $jwtManager, UserProviderInterface $userProvider)
    {
        $this->jwtManager = $jwtManager;
        $this->userProvider = $userProvider;
    }

    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return new JsonResponse(['error' => 'Invalid JSON'], 400);
        }

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        try {
            $user = $this->userProvider->loadUserByIdentifier($email);

            if (password_verify($password, $user->getPassword())) {
                // Génération du token JWT
                $token = $this->jwtManager->create($user);
                return new JsonResponse(['token' => $token]);
            }

            throw new AuthenticationException('Invalid credentials.');
        } catch (AuthenticationException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 401);
        }
    }
}
