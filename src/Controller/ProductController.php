<?php

namespace App\Controller;

use App\Entity\Produit;
use App\Entity\Categorie;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

    class ProductController extends AbstractController
    {
        #[Route('/api/product', name: 'app_product', methods: ['GET'])]
        public function getCustomProduits(EntityManagerInterface $entityManager): JsonResponse
        {
            try {
                $produits = $entityManager->getRepository(Produit::class)
                    ->createQueryBuilder('p')
                    ->getQuery()
                    ->getResult();
        
                $data = array_map(fn(Produit $produit) => [
                    'id' => $produit->getId(),
                    'nom' => $produit->getNom(),
                    'prix' => $produit->getPrix(),
                    'dateCreation' => $produit->getDateCreation(),
                    'description' => $produit->getDescription(),
                    'categorie' => $produit->getCategorie(),
                    // Si le nom de l'image est stocké sans le chemin complet, ajouter le chemin dans la réponse
                    'image_url' => $produit->getImageUrl() ? '' . $produit->getImageUrl() : null,
                ], $produits);
        
                return $this->json($data);
            } catch(Exception $e) {
                return $this->json(['error' => $e->getMessage()], 500);
            }
        }
        
        
        #[Route('/api/add-product', name: 'app_add-product', methods: ['POST'])]
public function addProduit(Request $request, EntityManagerInterface $entityManager, LoggerInterface $logger): JsonResponse
{
    try {
        // Récupérer les données JSON
        $data = json_decode($request->getContent(), true);
        
        if ($data === null) {
            $logger->error('Erreur de décodage JSON', ['content' => $request->getContent()]);
            return new JsonResponse(['error' => 'Données JSON invalides'], 400);
        }
        
        // Validation des données
        if (!isset($data['nom'], $data['prix'], $data['categorie'])) {
            $logger->warning('Données manquantes', ['data' => $data]);
            return new JsonResponse(['error' => 'Nom, prix et catégorie sont requis'], 400);
        }
    
        // Récupérer la catégorie
        $categorie = $entityManager->getRepository(Categorie::class)->find($data['categorie']);
        if (!$categorie) {
            $logger->warning('Catégorie invalide', ['categorie_id' => $data['categorie']]);
            return new JsonResponse(['error' => 'Catégorie invalide'], 400);
        }
    
        // Créer un nouvel objet Produit
        $produit = new Produit();
        $produit->setNom($data['nom'])
                ->setPrix($data['prix'])
                ->setDescription($data['description'] ?? null)
                ->setDateCreation(new \DateTime())
                ->setCategorie($categorie);

        // Persister le produit dans la base de données
        $entityManager->persist($produit);
        $entityManager->flush();
        $logger->info('Produit ajouté à la base de données', ['id' => $produit->getId()]);
    
        // Retourner la réponse JSON avec JsonResponse
        return new JsonResponse([
            'message' => 'Produit ajouté avec succès',
            'id' => $produit->getId(),
        ], 201);
    } catch (Exception $e) {
        $logger->error('Erreur lors de l\'ajout du produit', ['exception' => $e]);
        return new JsonResponse(['error' => $e->getMessage()], 500);
    }
}

        #[Route('/api/add-categorie', name: 'app_add-categorie', methods: ['POST'])]
        public function addCategorie(Request $request, EntityManagerInterface $entityManager): JsonResponse
        {
            try {
                $data = json_decode($request->getContent(), true);

                if (!isset($data['nom']) || empty($data['nom'])) {
                    return $this->json(['error' => 'Le nom de la catégorie est requis'], 400);
                }

                $existingCategorie = $entityManager->getRepository(Categorie::class)->findOneBy(['nom' => $data['nom']]);
                if ($existingCategorie) {
                    return $this->json(['error' => 'Une catégorie avec ce nom existe déjà'], 400);
                }

                $categorie = new Categorie();
                $categorie->setNom($data['nom']);

                $entityManager->persist($categorie);
                $entityManager->flush();

                return $this->json([
                    'message' => 'Catégorie ajoutée avec succès',
                    'id' => $categorie->getId(),
                ], 201);
            } catch (Exception $e) {
                return $this->json(['error' => 'Erreur lors de l\'ajout de la catégorie'], 500);
            }
        }

        #[Route('/api/product/{id}', name: 'app_delete_product', methods: ['DELETE'])]
        public function deleteProduit(int $id, EntityManagerInterface $entityManager): JsonResponse
        {
            try {
                $produit = $entityManager->getRepository(Produit::class)->find($id);

                if (!$produit) {
                    return $this->json(['error' => 'Produit non trouvé'], 404);
                }

                $entityManager->remove($produit);
                $entityManager->flush();

                return $this->json(['message' => 'Produit supprimé avec succès']);
            } catch (Exception $e) {
                return $this->json(['error' => 'Erreur lors de la suppression du produit'], 500);
            }
        }

        #[Route('/api/product/{id}', name: 'app_update_product', methods: ['PUT'])]
        public function updateProduit(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
        {
            try {
                $produit = $entityManager->getRepository(Produit::class)->find($id);

                if (!$produit) {
                    return $this->json(['error' => 'Produit non trouvé'], 404);
                }

                $data = json_decode($request->getContent(), true);

                if (!isset($data['nom'], $data['prix'], $data['categorie'])) {
                    return $this->json(['error' => 'Les champs nom, prix et catégorie sont obligatoires'], 400);
                }

                $categorie = $entityManager->getRepository(Categorie::class)->find($data['categorie']);
                if (!$categorie) {
                    return $this->json(['error' => 'Catégorie invalide'], 400);
                }

                $produit->setNom($data['nom'])
                    ->setPrix($data['prix'])
                    ->setDescription($data['description'] ?? $produit->getDescription())
                    ->setCategorie($categorie);

                $entityManager->flush();

                return $this->json(['message' => 'Produit modifié avec succès', 'id' => $produit->getId()]);
            } catch (Exception $e) {
                return $this->json(['error' => 'Erreur lors de la modification du produit : ' . $e->getMessage()], 500);
            }
        }

        #[Route('/api/product/{id}', name: 'app_get_product', methods: ['GET'])]
        public function getProduit(int $id, EntityManagerInterface $entityManager): JsonResponse
        {
            try {
                $produit = $entityManager->getRepository(Produit::class)->find($id);

                if (!$produit) {
                    return $this->json(['error' => 'Produit non trouvé'], 404);
                }

                $data = [
                    'id' => $produit->getId(),
                    'nom' => $produit->getNom(),
                    'description' => $produit->getDescription(),
                    'prix' => $produit->getPrix(),
                    'categorie' => [
                        'id' => $produit->getCategorie()->getId(),
                        'nom' => $produit->getCategorie()->getNom(),
                    ],
                    'dateCreation' => $produit->getDateCreation(),
                    'imageUrl' => $produit->getImageUrl(),
                ];

                return $this->json($data);
            } catch (Exception $e) {
                return $this->json(['error' => 'Erreur lors de la récupération du produit : ' . $e->getMessage()], 500);
            }
        }

}
