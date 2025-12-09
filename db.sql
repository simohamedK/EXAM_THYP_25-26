CREATE DATABASE IF NOT EXISTS traitement_docs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE traitement_docs;

CREATE TABLE mots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mot VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    chemin VARCHAR(500) NOT NULL UNIQUE,
    type VARCHAR(50),
    taille INT
);

CREATE TABLE frequences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mot_id INT NOT NULL,
    document_id INT NOT NULL,
    frequence INT NOT NULL,
    UNIQUE (mot_id, document_id),
    FOREIGN KEY (mot_id) REFERENCES mots(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);
CREATE TABLE historique_indexation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_execution TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type_indexation VARCHAR(50) NOT NULL,
    dossier_cible VARCHAR(500),
    fichiers_ajoutes INT DEFAULT 0,
    fichiers_modifies INT DEFAULT 0,
    fichiers_identiques INT DEFAULT 0,
    fichiers_erreurs INT DEFAULT 0,
    vider_db BOOLEAN DEFAULT FALSE,
    duree_secondes FLOAT,
    `status` VARCHAR(50) DEFAULT 'Succès',
    message_erreur TEXT
);