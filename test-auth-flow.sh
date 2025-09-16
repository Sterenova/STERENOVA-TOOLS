#!/bin/bash

echo "🔐 Test du flux d'authentification Sterenova"
echo "=============================================="

# Arrêter les services existants
echo "📦 Arrêt des services existants..."
docker-compose down

# Supprimer les anciennes images
echo "🗑️ Suppression des anciennes images..."
docker image rm sterenova-flux-frontend sterenova-studio-frontend 2>/dev/null || true

# Rebuild les frontends
echo "🏗️ Rebuild des frontends..."
docker-compose build sterenova-flux-frontend sterenova-studio-frontend

# Démarrer tous les services
echo "🚀 Démarrage de tous les services..."
docker-compose up -d

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérifier l'état des services
echo "🔍 Vérification de l'état des services..."
docker-compose ps

echo ""
echo "✅ Services démarrés !"
echo ""
echo "🌐 URLs d'accès :"
echo "   • Kong Gateway: http://localhost:8000"
echo "   • Flux Frontend: http://localhost:8000/flux"
echo "   • Studio Frontend: http://localhost:8000/studio"
echo "   • Keycloak: http://localhost:8080"
echo ""
echo "🧪 Tests à effectuer :"
echo "   1. Accéder à http://localhost:8000/flux (page d'accueil sans auth)"
echo "   2. Cliquer sur 'Se connecter' → doit rediriger vers Keycloak"
echo "   3. Se connecter avec Keycloak"
echo "   4. Vérifier l'accès au dashboard"
echo "   5. Tester la déconnexion"
echo "   6. Répéter pour Studio"
echo ""
echo "📝 Logs des services :"
echo "   docker-compose logs -f"
