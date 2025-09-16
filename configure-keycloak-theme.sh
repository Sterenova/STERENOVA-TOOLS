#!/bin/bash

echo "🎨 Configuration du thème Sterenova pour Keycloak"
echo "==============================================="

# Variables
KEYCLOAK_URL="http://localhost:8080"
ADMIN_USER="admin"
ADMIN_PASSWORD="admin"
REALM_NAME="platform"
THEME_NAME="keycloakify-starter"
MAX_RETRIES=30
RETRY_INTERVAL=5

# Fonction pour attendre que Keycloak soit prêt
wait_for_keycloak() {
    echo "⏳ Attente du démarrage de Keycloak..."
    
    for i in $(seq 1 $MAX_RETRIES); do
        if curl -s "${KEYCLOAK_URL}/health/ready" > /dev/null 2>&1; then
            echo "✅ Keycloak est prêt"
            return 0
        fi
        
        echo "   Tentative $i/$MAX_RETRIES - Attente de ${RETRY_INTERVAL}s..."
        sleep $RETRY_INTERVAL
    done
    
    echo "❌ Timeout: Keycloak n'est pas accessible"
    return 1
}

# Fonction pour configurer les credentials kcadm
configure_kcadm() {
    echo "🔑 Configuration des credentials kcadm..."
    
    # Configurer les credentials via docker exec
    for i in $(seq 1 10); do
        echo "${ADMIN_PASSWORD}" | docker exec -i sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh config credentials --server "${KEYCLOAK_URL}" --realm master --user "${ADMIN_USER}" --password admin 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "✅ Credentials kcadm configurés"
            
            # Désactiver SSL requirement pour le realm master
            echo "🔒 Configuration SSL pour le realm master..."
            docker exec sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh update realms/master -s sslRequired=NONE 2>/dev/null
            
            if [ $? -eq 0 ]; then
                echo "✅ SSL requirement désactivé pour le realm master"
                return 0
            else
                echo "⚠️  Warning: Impossible de désactiver SSL requirement"
                return 0
            fi
        fi
        
        echo "   Tentative $i/10 - Attente de 3s..."
        sleep 3
    done
    
    echo "❌ Impossible de configurer les credentials kcadm"
    return 1
}

# Fonction pour vérifier si le realm existe
check_realm_exists() {
    echo "🔍 Vérification de l'existence du realm ${REALM_NAME}..."
    
    # Vérifier si le realm existe via docker exec
    docker exec sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh get realms/${REALM_NAME} 2>/dev/null >/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Realm ${REALM_NAME} existe"
        return 0
    else
        echo "❌ Realm ${REALM_NAME} n'existe pas"
        return 1
    fi
}

# Fonction pour configurer le thème
configure_theme() {
    echo "🎨 Configuration du thème ${THEME_NAME} pour le realm ${REALM_NAME}..."
    
    # Mettre à jour le realm avec le thème personnalisé via docker exec
    docker exec sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh update realms/${REALM_NAME} -s loginTheme=${THEME_NAME} -s accountTheme=${THEME_NAME} -s adminTheme=${THEME_NAME} -s emailTheme=${THEME_NAME} 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Thème configuré avec succès"
        return 0
    else
        echo "❌ Erreur lors de la configuration du thème"
        return 1
    fi
}

# Fonction pour créer un utilisateur de test
create_test_user() {
    echo "👤 Vérification et création d'un utilisateur de test..."
    
    # Vérifier si l'utilisateur existe via docker exec
    USER_EXISTS=$(docker exec sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh get users -r ${REALM_NAME} -q username=test 2>/dev/null | grep -c '"username"')
    
    if [ "$USER_EXISTS" = "0" ]; then
        echo "📝 Création de l'utilisateur de test..."
        
        # Créer l'utilisateur via docker exec
        docker exec sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh create users -r ${REALM_NAME} -s username=test -s email=test@sterenova.com -s firstName=Test -s lastName=User -s enabled=true -s emailVerified=true 2>/dev/null
        
        if [ $? -eq 0 ]; then
            # Définir le mot de passe via docker exec
            docker exec sterenova-tools-keycloak-1 /opt/keycloak/bin/kcadm.sh set-password -r ${REALM_NAME} --username test --new-password test123 2>/dev/null
            
            echo "✅ Utilisateur de test créé (test@sterenova.com / test123)"
        else
            echo "❌ Erreur lors de la création de l'utilisateur de test"
        fi
    else
        echo "✅ Utilisateur de test existe déjà"
    fi
}

# Fonction principale
main() {
    echo "🚀 Démarrage de la configuration du thème"
    
    # Étapes d'initialisation
    if ! wait_for_keycloak; then
        echo "❌ Échec: Keycloak n'est pas accessible"
        exit 1
    fi
    
    if ! configure_kcadm; then
        echo "❌ Échec: Impossible de configurer kcadm"
        exit 1
    fi
    
    if ! check_realm_exists; then
        echo "❌ Échec: Le realm ${REALM_NAME} n'existe pas"
        echo "💡 Le realm devrait être créé automatiquement par l'import du realm-export.json"
        exit 1
    fi
    
    if ! configure_theme; then
        echo "❌ Échec: Impossible de configurer le thème"
        exit 1
    fi
    
    create_test_user
    
    echo ""
    echo "🎉 Configuration terminée avec succès !"
    echo ""
    echo "🌐 Accès :"
    echo "   • Admin Console: ${KEYCLOAK_URL}/admin"
    echo "   • Page de connexion: ${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/auth?client_id=frontend-app&response_type=code&scope=openid&redirect_uri=http://localhost:8000/flux/"
    echo "   • Utilisateur de test: test@sterenova.com / test123"
    echo ""
    echo "🎨 Le thème personnalisé Sterenova est maintenant actif !"
    echo "   • Design: Tailwind CSS + shadcn/ui"
    echo "   • Logo: Sterenova"
    echo "   • Palette: Cohérente avec les frontends"
}

# Exécution
main