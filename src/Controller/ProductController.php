<?php
namespace App\Controller;
use App\Entity\Produit;
use Exception;
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
        // Exemple : Récupérer les produits avec un prix supérieur à 100000
        try {
            $produits = $entityManager->getRepository(Produit::class)
            ->createQueryBuilder('p')
            // ->where('p.prix > :prix')
            // ->setParameter('prix', 100000)
            ->getQuery()
            ->getResult();

        $data = array_map(fn(Produit $produit) => [
            'id' => $produit->getId(),
            'nom' => $produit->getNom(),
            'prix' => $produit->getPrix(),
            'dateCreation' => $produit->getDateCreation(),
            'description' => $produit->getDescription(),
            'categorie' => $produit->getCategorie(),
        ], $produits);

        return $this->json($data);
        }
        catch(Exception $e){
            dd($e);
        }
    }

    #[Route('/api/add-produit', name: 'add_produit', methods: ['POST'])]
    public function addProduit(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupère les données envoyées en JSON
        $data = json_decode($request->getContent(), true);

        // Validation simple
        if (!isset($data['nom'], $data['prix'])) {
            return $this->json(['error' => 'Nom et prix sont requis'], 400);
        }

        // Crée un nouvel objet Produit
        $produit = new Produit();
        $produit->setNom($data['nom'])
            ->setPrix($data['prix'])
            ->setDescription($data['description'] ?? null)
            ->setDateCreation(new \DateTime());

        // Persiste et sauvegarde dans la base de données
        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json([
            'message' => 'Produit ajouté avec succès',
            'id' => $produit->getId(),
        ], 201);
    }
}