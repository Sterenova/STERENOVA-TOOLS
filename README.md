# 🚀 Microservices Platform - Simple Setup

Une plateforme microservices complète avec un seul Docker Compose pour tout démarrer !

## 🎯 Services Inclus

- **📱 Frontend Next.js** - Template moderne avec TypeScript et shadcn/ui
- **🔧 Backend Node.js** - API NestJS avec authentification Keycloak
- **🐍 Backend Python** - API FastAPI avec authentification Keycloak
- **🔐 Keycloak** - Serveur d'authentification SSO (pré-configuré)
- **🌐 Kong Gateway** - API Gateway avec rate limiting
- **🗄️ PostgreSQL** - Base de données principale
- **📦 Redis** - Cache et sessions

## 🚀 Démarrage Ultra Simple

```bash
docker compose up -d
```

C'est tout ! 🎉

## 📍 URLs des Services

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Interface utilisateur Next.js |
| **Node.js API** | http://localhost:3001 | Backend NestJS |
| **Python API** | http://localhost:3002 | Backend FastAPI |
| **Keycloak** | http://localhost:8080 | Authentification (admin/admin) |
| **Kong Gateway** | http://localhost:8000 | API Gateway |
| **PostgreSQL** | localhost:5432 | Base de données |
| **Redis** | localhost:6379 | Cache |

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