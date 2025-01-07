<?php

namespace App\Controller;

use App\Entity\Produit;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Psr\Log\LoggerInterface;

class UploadImageController extends AbstractController
{
    #[Route('/api/add-product/{id}/image_url', name: 'app_add_product_image', methods: ['POST'])]
    public function addImageUrl(int $id, Request $request, EntityManagerInterface $entityManager, LoggerInterface $logger): JsonResponse
    {
        try {
            // Vérifier si l'ID est un entier
            if (!is_int($id)) {
                return $this->json(['error' => 'ID invalide, doit être un entier'], 400);
            }
    
            // Récupérer le produit correspondant à l'ID
            $produit = $entityManager->getRepository(Produit::class)->find($id);
    
            if (!$produit) {
                return $this->json(['error' => 'Produit non trouvé'], 404);
            }
    
            // Récupérer l'image depuis la requête
            $imageFile = $request->files->get('image_url');  // Utilisez files->get() pour récupérer le fichier téléchargé
    
            if (!$imageFile) {
                return $this->json(['error' => 'Aucune image reçue'], 400);
            }
    
            // Loguer les informations sur le fichier reçu
            $logger->info('Fichier reçu', [
                'filename' => $imageFile->getClientOriginalName(),
                'file_size' => $imageFile->getSize(),
                'file_extension' => $imageFile->guessExtension()
            ]);
    
            // Vérifiez que l'extension du fichier est valide
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            $imageExtension = $imageFile->guessExtension();
            if (!in_array($imageExtension, $allowedExtensions)) {
                return $this->json(['error' => 'Extension de fichier invalide. Les extensions autorisées sont jpg, jpeg, png, gif.'], 400);
            }
    
            // Créer un nom unique pour le fichier image
            $newFilename = uniqid() . '.' . $imageExtension;
    
            // Dossier où l'image sera stockée
            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/products';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
                $logger->info('Dossier créé pour les images', ['path' => $uploadDir]);
            }
    
            // Déplacer l'image téléchargée dans le dossier cible
            $imageFile->move($uploadDir, $newFilename);
            $logger->info('Image téléchargée et sauvegardée avec succès', ['new_filename' => $newFilename]);
    
            // Mettre à jour l'URL de l'image du produit
            $produit->setImageUrl('/uploads/products/' . $newFilename);
            $produit->setImagePath($uploadDir . '/' . $newFilename);
    
            // Persister les modifications dans la base de données
            $entityManager->flush();
            $logger->info('Image mise à jour pour le produit', ['product_id' => $id, 'image_url' => $produit->getImageUrl()]);
    
            return $this->json([
                'message' => 'Image ajoutée avec succès',
                'image_url' => $produit->getImageUrl()
            ], 200);
    
        } catch (\Exception $e) {
            // Loguer l'exception complète
            $logger->error('Erreur lors de l\'ajout de l\'image', ['exception' => $e]);
    
            // Afficher les détails de l'erreur pour le débogage
            return new JsonResponse([
                'error' => 'Erreur lors de l\'ajout de l\'image',
                'exception_message' => $e->getMessage(),  // Afficher le message d'exception
                'exception_trace' => $e->getTraceAsString()  // Afficher la trace de l'exception
            ], 500);
        }
    }
}    