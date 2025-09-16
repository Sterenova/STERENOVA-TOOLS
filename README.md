# 🚀 Microservices Platform - Sterenova avec Keycloak

Une plateforme microservices complète avec authentification SSO Keycloak pour les applications Sterenova Flux et Sterenova Studio.

## 🎯 Services Inclus

- **📊 Sterenova Flux Frontend** - Interface de gestion des devis et factures
- **🎨 Sterenova Studio Frontend** - Interface de génération de templates SVG
- **🔧 Sterenova Flux Backend** - API pour la gestion des devis et factures
- **🔧 Sterenova Studio Backend** - API pour la génération de templates
- **🔐 Keycloak** - Serveur d'authentification SSO (pré-configuré)
- **🌐 Kong Gateway** - API Gateway avec rate limiting
- **🗄️ PostgreSQL** - Base de données principale
- **📦 Redis** - Cache et sessions

## 🚀 Démarrage Ultra Simple

```bash
# Démarrer tous les services
./start-sterenova.sh

# Ou manuellement
docker compose up -d
```

## 📍 URLs des Services

| Service | URL | Description |
|---------|-----|-------------|
| **Keycloak** | http://localhost:8080 | Authentification SSO (admin/admin) |
| **Kong Gateway** | http://localhost:8000 | API Gateway |
| **Sterenova Flux** | http://localhost:3003 | Interface Flux |
| **Sterenova Studio** | http://localhost:3001 | Interface Studio |
| **Flux Backend** | http://localhost:3002 | API Flux |
| **Studio Backend** | http://localhost:3000 | API Studio |
| **PostgreSQL** | localhost:5432 | Base de données |
| **Redis** | localhost:6379 | Cache |

## 🌐 URLs via Kong Gateway

| Service | URL | Description |
|---------|-----|-------------|
| **Sterenova Flux** | http://localhost:8000/flux | Interface Flux via Gateway |
| **Sterenova Studio** | http://localhost:8000/studio | Interface Studio via Gateway |
| **Flux API** | http://localhost:8000/api/flux | API Flux via Gateway |
| **Studio API** | http://localhost:8000/api/studio | API Studio via Gateway |

## 🔧 Commandes Utiles

```bash
# Démarrer tous les services
docker compose up -d

# Arrêter tous les services
docker compose down

# Voir les logs
docker compose logs -f

# Redémarrer un service
docker compose restart [service-name]

# Reconstruire et redémarrer
docker compose up -d --build
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Kong Gateway  │    │   Keycloak      │
│   Frontend      │◄───┤   (Port 8000)   │◄───┤   (Port 8080)   │
│   (Port 3000)   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Node.js API   │    │   Python API    │    │   PostgreSQL    │
│   (Port 3001)   │    │   (Port 3002)   │    │   (Port 5432)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                        ┌─────────────────┐
                        │     Redis       │
                        │   (Port 6379)   │
                        └─────────────────┘
```

## 🔐 Authentification (Pré-configurée)

- **Realm**: `platform`
- **Client Frontend**: `frontend-app`
- **Client Backend**: `backend-service`
- **Utilisateur test**: `testuser/password`
- **Utilisateur admin**: `admin/admin`

## 📝 Configuration

Tous les services sont pré-configurés pour fonctionner ensemble. Les variables d'environnement sont définies dans le `docker-compose.yml`.

## 🐛 Dépannage

Si un service ne démarre pas :

1. **Vérifiez les logs** :
   ```bash
   docker compose logs [service-name]
   ```

2. **Redémarrez le service** :
   ```bash
   docker compose restart [service-name]
   ```

3. **Reconstruisez si nécessaire** :
   ```bash
   docker compose up -d --build [service-name]
   ```

## 🎉 C'est Tout !

Avec cette configuration, vous avez une plateforme microservices complète qui se lance en une seule commande. Parfait pour le développement et les démonstrations !


```bash
cd opt/keycloak/bin/

./kcadm.sh config credentials --server http://localhost:8080 --realm master --user admin

./kcadm.sh update realms/master -s sslRequired=NONE

```