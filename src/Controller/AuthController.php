<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    #[Route('/api/login_check', name: 'app_security',methods: ['POST'])]
    public function loginCheck(): Response
    {
        // Le login_check est géré automatiquement par le LexikJWTAuthenticationBundle.
        // Si cette méthode est appelée, il faut retourner une erreur ou indiquer que l'authentification est prise en charge ailleurs.
        return new Response('Ce point de terminaison est géré par LexikJWTAuthenticationBundle.', Response::HTTP_BAD_REQUEST);
    }

    #[Route('/api/test', name: 'app_test')]
    public function appTest(): Response
    {
        return new Response('Vous êtes connecté');
    }
}
