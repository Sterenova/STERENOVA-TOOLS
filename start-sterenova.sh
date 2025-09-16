#!/bin/bash

echo "🚀 Démarrage de Sterenova avec thème Keycloak personnalisé"
echo "========================================================="

# Arrêter les services existants
echo "📦 Arrêt des services existants..."
docker compose down

# Démarrer tous les services
echo "🚀 Démarrage de tous les services..."
docker compose up -d --build

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 45

# Vérifier l'état des services
echo "🔍 Vérification de l'état des services..."
docker compose ps

# Configurer le thème Keycloak
echo "🎨 Configuration du thème Keycloak..."
./configure-keycloak-theme.sh

echo ""
echo "✅ Sterenova démarré avec succès !"
echo ""
echo "🌐 URLs d'accès :"
echo "   • Kong Gateway: http://localhost:8000"
echo "   • Flux Frontend: http://localhost:8000/flux"
echo "   • Studio Frontend: http://localhost:8000/studio"
echo "   • Keycloak: http://localhost:8080"
echo "   • Admin Console: http://localhost:8080/admin (admin/admin)"
echo ""
echo "👤 Utilisateur de test :"
echo "   • Email: test@sterenova.com"
echo "   • Mot de passe: test123"
echo ""
echo "🎨 Le thème personnalisé Sterenova est configuré !"
echo "   • Design: Tailwind CSS + shadcn/ui"
echo "   • Logo: Sterenova"
echo "   • Palette: Cohérente avec les frontends"
echo ""
echo "📝 Logs en temps réel :"
echo "   docker compose logs -f"
echo ""
echo "🛑 Arrêt des services :"
echo "   docker compose down"
