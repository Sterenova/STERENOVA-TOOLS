-- Script d'initialisation de la base de données
-- Insère l'utilisateur par défaut utilisé par le frontend

INSERT INTO users (id, email, name, "createdAt", "updatedAt")
VALUES (
    '123e4567-e89b-12d3-a456-426614174000',
    'user@example.com',
    'Utilisateur Demo',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING; 