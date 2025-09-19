#!/bin/bash

# Script d'initialisation de la base de données pour le service Client Management
echo "🗄️  Initialisation de la base de données client_management..."

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente que PostgreSQL soit prêt..."
until docker exec sterenova-tools-postgres-1 pg_isready -U platform; do
  echo "PostgreSQL n'est pas encore prêt, attente..."
  sleep 2
done

# Créer la base de données si elle n'existe pas
echo "📦 Création de la base de données client_management..."
docker exec sterenova-tools-postgres-1 psql -U platform -c "CREATE DATABASE client_management;" 2>/dev/null || echo "Base de données client_management déjà existante"

# Vérifier que la base de données a été créée
echo "✅ Vérification de la création de la base de données..."
docker exec sterenova-tools-postgres-1 psql -U platform -c "\l" | grep client_management

echo "🎉 Base de données client_management initialisée avec succès !"
echo "🚀 Vous pouvez maintenant démarrer le service client-management"
