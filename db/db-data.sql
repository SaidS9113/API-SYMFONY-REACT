INSERT INTO categorie (id, nom) VALUES 
(1, 'Hypercar'),
(2, 'Sportive de luxe'),
(3, 'Berline sportive'),
(4, 'SUV hybride');

INSERT INTO produit (id, nom, description, prix, date_creation, categorie_id) VALUES 
(1, 'Bugatti Chiron Super Sport 300+', 'Hypercar de luxe ultra-puissante.', 3000000, '2023-01-01 12:00:00', 1),
(2, 'Porsche 911 Turbo S', 'Voiture sportive, performante et élégante.', 200000, '2023-02-01 12:00:00', 2),
(3, 'BMW M5 Competition', 'Berline sportive avec 625 chevaux.', 150000, '2023-03-01 12:00:00', 3),
(4, 'Toyota RAV4 Hybrid', 'SUV hybride polyvalent et économique.', 40000, '2023-04-01 12:00:00', 4);


INSERT INTO user (email, roles, password, nom, prenom, adresse_postal) 
VALUES ('admin@gmail.com', '["ROLE_ADMIN"]', '$2y$10$6dfn1KUSy6IRajAZUtgDe3FXh5jFtJItFO.O9mgCUjjxDEtC2C9V.', 'Dupont', 'Jean', '123 Rue de Paris');

