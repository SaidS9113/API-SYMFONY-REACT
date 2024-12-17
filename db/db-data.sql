
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


INSERT INTO `user` (`email`, `roles`, `password`) VALUES 
('s@gmail.com', '["ROLE_ADMIN"]', '$2y$13$uIvYjHMX6N9TLv7iFNHZUuySN2Fl3SYmWXkJbo1/.W1oIj8fBZdT2'),
('p@gmail.com', '["ROLE_USER"]', '$2y$13$uIvYjHMX6N9TLv7iFNHZUuySN2Fl3SYmWXkJbo1/.W1oIj8fBZdT2');


