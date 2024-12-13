<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class AuthController extends AbstractController
{
    #[Route('/login_check', name: 'login_check', methods: ['POST'])]
    public function loginCheck(): JsonResponse
    {
        throw new \RuntimeException('This method should not be called directly. LexikJWTAuthenticationBundle handles the login process.');
    }
}
