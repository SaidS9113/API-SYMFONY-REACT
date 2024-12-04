<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Categorie;
use Doctrine\ORM\EntityManagerInterface;

class CategoryController extends AbstractController
{
    // Récupérer toutes les catégories
    #[Route('/api/categorie', name: 'app_categorie', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $categories = $entityManager->getRepository(Categorie::class)->findAll();
    
        $categoriesArray = array_map(function ($categorie) {
            return [
                'id' => $categorie->getId(),
                'nom' => $categorie->getNom(),
            ];
        }, $categories);
    
        return $this->json($categoriesArray); // Retourne une réponse JSON
    }

    #[Route('/api/categorie/{id}', name: 'app_delete_categorie', methods: ['DELETE'])]
public function deleteCategorie(int $id, EntityManagerInterface $entityManager): JsonResponse
{
    try {
        $categorie = $entityManager->getRepository(Categorie::class)->find($id);

        if (!$categorie) {
            return $this->json(['error' => 'Catégorie non trouvée'], 404);
        }

        // Dissocier la catégorie des produits liés
        $products = $entityManager->getRepository(\App\Entity\Produit::class)->findBy(['categorie' => $categorie]);
        foreach ($products as $product) {
            $product->setCategorie(null); // Mettre categorie_id à NULL
            $entityManager->persist($product);
        }

        $entityManager->flush(); // Sauvegarder les modifications sur les produits

        // Supprime la catégorie
        $entityManager->remove($categorie);
        $entityManager->flush();

        return $this->json(['message' => 'Catégorie supprimée avec succès']);
    } catch (\Exception $e) {
        return $this->json(['error' => 'Erreur lors de la suppression de la catégorie : ' . $e->getMessage()], 500);
    }
}

    // Modifier une catégorie
    #[Route('/api/categorie/{id}', name: 'update_categorie', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $categorie = $entityManager->getRepository(Categorie::class)->find($id);

        if (!$categorie) {
            return $this->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['nom'])) {
            $categorie->setNom($data['nom']);
        } else {
            return $this->json(['message' => 'Le champ "nom" est requis'], 400);
        }

        $entityManager->flush();

        return $this->json(['message' => 'Catégorie modifiée avec succès']);
    }
}
