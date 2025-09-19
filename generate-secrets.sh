#!/bin/bash

# Script de génération de secrets sécurisés pour la production
echo "🔐 Génération de secrets sécurisés pour Sterenova Platform"
echo "=========================================================="
echo ""

# Fonction pour générer un mot de passe sécurisé
generate_password() {
    local length=${1:-32}
    openssl rand -base64 $length | tr -d "=+/" | cut -c1-${length}
}

# Fonction pour générer un secret JWT
generate_jwt_secret() {
    openssl rand -base64 64 | tr -d "=+/"
}

echo "📝 Copiez ces valeurs dans votre configuration Coolify :"
echo ""
echo "🔒 VARIABLES SENSIBLES (Sensitive = true) :"
echo "--------------------------------------------"
echo "POSTGRES_PASSWORD=$(generate_password 32)"
echo "KEYCLOAK_ADMIN_PASSWORD=$(generate_password 24)"
echo "KEYCLOAK_CLIENT_SECRET=$(generate_password 32)"
echo "JWT_SECRET=$(generate_jwt_secret)"
echo ""

echo "🌐 VARIABLES PUBLIQUES (Sensitive = false) :"
echo "---------------------------------------------"
echo "SERVICE_FQDN_KEYCLOAK=keycloack.sterenova.fr"
echo "SERVICE_FQDN_KONG=kong.sterenova.fr"
echo "SERVICE_FQDN_STERENOVA_FLUX_BACKEND=api.flux.sterenova.fr"
echo "SERVICE_FQDN_STERENOVA_FLUX_FRONTEND=flux.sterenova.fr"
echo "SERVICE_FQDN_STERENOVA_STUDIO_BACKEND=api.studio.sterenova.fr"
echo "SERVICE_FQDN_STERENOVA_STUDIO_FRONTEND=studio.sterenova.fr"
echo ""
echo "SERVICE_URL_KEYCLOAK=https://keycloack.sterenova.fr"
echo "SERVICE_URL_KONG=https://kong.sterenova.fr"
echo "SERVICE_URL_STERENOVA_FLUX_BACKEND=https://api.flux.sterenova.fr"
echo "SERVICE_URL_STERENOVA_FLUX_FRONTEND=https://flux.sterenova.fr"
echo "SERVICE_URL_STERENOVA_STUDIO_BACKEND=https://api.studio.sterenova.fr"
echo "SERVICE_URL_STERENOVA_STUDIO_FRONTEND=https://studio.sterenova.fr"
echo ""
echo "POSTGRES_DB=platform"
echo "POSTGRES_USER=platform"
echo "KEYCLOAK_ADMIN=admin"
echo "KEYCLOAK_REALM=platform"
echo "KEYCLOAK_CLIENT_ID=backend-service"
echo "SSL_CERT_PATH=/etc/ssl/certs"
echo "KEYCLOAK_LOG_LEVEL=INFO"
echo ""

echo "⚠️  IMPORTANT :"
echo "- Stockez ces secrets de manière sécurisée"
echo "- Ne commitez jamais ces valeurs dans Git"
echo "- Utilisez un gestionnaire de mots de passe"
echo "- Régénérez les secrets si compromis"
echo ""

echo "🚀 Prochaines étapes :"
echo "1. Copiez les variables sensibles dans Coolify (Sensitive = true)"
echo "2. Copiez les variables publiques dans Coolify (Sensitive = false)"
echo "3. Déployez votre application"
echo "4. Configurez SSL avec Let's Encrypt"
echo "5. Testez tous les endpoints"
echo ""

echo "✅ Génération terminée !"
