# Utiliser une image PHP officielle avec Apache et les extensions nécessaires
FROM php:8.2-apache

# Installer les dépendances requises
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install intl mbstring xml zip pdo pdo_mysql

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Activer le module Apache pour Symfony
RUN a2enmod rewrite

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier le code source du projet
COPY . .

# Installer les dépendances PHP avec Composer
RUN composer install --no-dev --optimize-autoloader

# Définir les permissions correctes
RUN chown -R www-data:www-data /var/www/html

# Exposer le port 80 pour Apache
EXPOSE 80

# Commande de démarrage du conteneur
CMD ["apache2-foreground"]