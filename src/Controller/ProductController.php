<?php
namespace App\Controller;
use App\Entity\Produit;
use App\Entity\Categorie;
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

    #[Route('/api/add-product', name: 'app_add-product', methods: ['POST'])]
    public function addProduit(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
           
            $data = json_decode($request->getContent(), true);
    
       
            if (!isset($data['nom'], $data['prix'], $data['categorie'])) {
                return $this->json(['error' => 'Nom, prix et catégorie sont requis'], 400);
            }
    
    
            $categorie = $entityManager->getRepository(Categorie::class)->find($data['categorie']);
            if (!$categorie) {
                return $this->json(['error' => 'Catégorie invalide'], 400);
            }
    
            $produit = new Produit();
            $produit->setNom($data['nom'])
                ->setPrix($data['prix'])
                ->setDescription($data['description'] ?? null)
                ->setDateCreation(new \DateTime())
                ->setCategorie($categorie);
    
            
            $entityManager->persist($produit);
            $entityManager->flush();
    
            return $this->json([
                'message' => 'Produit ajouté avec succès',
                'id' => $produit->getId(),
            ], 201);
        } catch (Exception $e) {
            dd($e); 
        }
    }
}    