Documentation

1.1. Installation de Symfony 
- composer create-project symfony/skeleton:"7.2.x-dev" API-SYMFONY-REACT

1.2. Installation de React dans mon projet Symfony 
- npx create-react-app front-end-react

1.3. Choix de la base de données Mysql car je suis le plus à l'aise 
- DATABASE_URL="mysql://root:@127.0.0.1:8585/gestionProduct" -> sa se trouve dans le fichier .env de mon dossier racine

1.4. Démarrage serveur Apache et Mysql avec la palette XAMPP
- start 

1.5. Création de la database sous le nom de gestionproduit
- php bin/console doctrine:database:create

1.6. Création des 2 entités : produit et categorie via le terminal du vscode
- php bin/console make:entity produit type : id, description, prix, date_creation et categorie_id 
- php bin/console make:entity categorie type: id et nom
! Information pour la data du produit et categorie dans le dossier db/db-data.db

1.7. Mise en place de leurs table via le terminal du vscode avec une relation de type 1-N ManytoOne

1.8. Migration pour entrés les entités dans ma database "gestionproduit"
- php bin/console doctrine:migrations:migrate
- php bin/console make:migration
- php bin/console doctrine:migrations:generate
- php bin/console doctrine:migrations:diff    

1.9. Création du dictionnaire de données pour savoir sur quel sujet portera ce projet et j'ai choisie un sujet de voiture qui est pour moi l'entity produit et ses catégories

1.10. Création du MPD pour la DATA de chaque table en créant un dossier db puis un fichier db-data.db
- api-symfony-react-ssd/db/db-data.db

1.11. Insertion des données dans mysql partie SQL 
- http://localhost/phpmyadmin/index.php?route=/sql&pos=0&db=gestionproduct&table=categorie

1.12. Installation de l'API AXIOS pour consommer l'application en créant le fichier api.js dans src de mon dossier front-end-react
- npm install axios
- yarn add axios
- création du fichier api.js dans le dossier racine de mon site plus précisement dans mon src

1.13. Création des routes  GET, POST, PUT et DELETE et personalisation pour le produit
- Dans le dossier Controller des fichiers ce sont crée automatiquement et c'est dedans que j'ai manipuler le CRUD 

1.14. Installation de Tailwind et mise en place d'un préprocesseur CSS (Sass) qui et Sass pour ajuster le design au milimetre près et avoir le controle sur le design Tailwind si besoin
- cd front-end-react
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init
- puis configurer le fichier tailwind.config.js
- Création d'un dossier assets avec des sous-dossier : css et sass
- sass --watch front-end-react/src/assets/sass/style.scss front-end-react/src/assets/css/style.css 

1.15. Création d'un dossier components pour mettre tout les fichiers.jsx 
- Pour une meilleurs organisation des fichier

1.16. Design en mettant en place la police et la couleur approximative de Teach'r et design Tailwind pour tout les tableaux et formulaire de mon front-end
- Aller sur Google 
- Ajout de cela dans le head de index.html : <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

-  Ajout de cela dans tailwind.config.js
theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], 
      },
    },
  },

1.17. Création des routes  GET, POST et DELETE pour categorie
- Dans le Controller

1.18. Installation de Redux et Mise en place de l'environnement dans le dossier front-end-react
- npm install @reduxjs/toolkit react-redux 
- Création d'un dossier redux avec à l'intérieur un fichier store.js et création d'un dossier slices et à l'intérieur du dossier slices un fichier produitSlice.js

1.19. Création de user et role pour l'Authentification JWT
- php bin/console make:entity user / puis tout s'est fait automatiquement pour l'entity role, les types et leurs relation

1.20. Mise en place de l'environnemment pour JWT
- composer require lexik/jwt-authentication-bundle 

1.21. Mise en place du Design avancées


