-- Initialisation de la base de données client_management
-- Ce script crée la base de données et les tables nécessaires

-- Créer la base de données si elle n'existe pas
-- (Cette commande doit être exécutée en tant que superuser)
-- CREATE DATABASE client_management;

-- Se connecter à la base de données client_management
-- \c client_management;

-- Créer l'extension uuid-ossp si elle n'existe pas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- La table clients sera créée automatiquement par TypeORM
-- mais nous pouvons créer quelques données de test

-- Note: Les tables seront créées automatiquement par TypeORM avec synchronize: true
-- en mode développement. En production, utilisez les migrations TypeORM.

-- Exemple de données de test (optionnel)
-- INSERT INTO clients (id, "firstName", "lastName", email, phone, company, address, "postalCode", city, country, status, "customerType", "createdAt", "updatedAt") VALUES
-- (uuid_generate_v4(), 'Jean', 'Dupont', 'jean.dupont@example.com', '+33123456789', 'Acme Corp', '123 Rue de la Paix', '75001', 'Paris', 'France', 'active', 'business', NOW(), NOW()),
-- (uuid_generate_v4(), 'Marie', 'Martin', 'marie.martin@example.com', '+33987654321', NULL, '456 Avenue des Champs', '69000', 'Lyon', 'France', 'active', 'individual', NOW(), NOW()),
-- (uuid_generate_v4(), 'Pierre', 'Durand', 'pierre.durand@example.com', '+33555666777', 'Tech Solutions', '789 Boulevard Saint-Germain', '13001', 'Marseille', 'France', 'inactive', 'business', NOW(), NOW());
