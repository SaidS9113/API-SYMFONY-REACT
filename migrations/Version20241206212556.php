<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20241206000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Migration for tables Produit and Categorie';
    }

    public function up(Schema $schema): void
    {
        // SQL for creating tables
        $this->addSql('CREATE TABLE produit (id INT AUTO_INCREMENT NOT NULL, categorie_id INT NOT NULL, nom VARCHAR(150) DEFAULT NULL, description LONGTEXT DEFAULT NULL, prix DOUBLE PRECISION DEFAULT NULL, date_creation DATETIME DEFAULT NULL, INDEX IDX_Categories (categorie_id), PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(150) DEFAULT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema): void
    {
        // SQL for reverting the migration
        $this->addSql('DROP TABLE produit');
        $this->addSql('DROP TABLE categorie');
    }
}
