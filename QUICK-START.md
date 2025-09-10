# 🚀 Démarrage Rapide - Microservices Platform

## ⚡ Une seule commande pour tout démarrer !

```bash
docker compose up -d
```

## 🎯 Accès aux Services

| Service | URL | Identifiants |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **Node.js API** | http://localhost:3001 | - |
| **Python API** | http://localhost:3002 | - |
| **Keycloak Admin** | http://localhost:8080/admin | admin/admin |
| **Kong Gateway** | http://localhost:8000 | - |

## 🔐 Utilisateurs de Test

- **Utilisateur normal**: `testuser` / `password`
- **Administrateur**: `admin` / `admin`

## 🧪 Test de l'Authentification

1. **Accédez au frontend** : http://localhost:3000
2. **Cliquez sur "Login"** - vous serez redirigé vers Keycloak
3. **Connectez-vous** avec `testuser` / `password`
4. **Vous devriez être redirigé** vers le frontend avec votre profil

## 🔧 Interface d'Administration Keycloak

- **URL** : http://localhost:8080/admin
- **Identifiants** : `admin` / `admin`
- **Realm** : Sélectionnez "platform" dans le menu déroulant

## 🛑 Arrêter les Services

```bash
docker compose down
```

## 📊 Voir les Logs

```bash
docker compose logs -f
```

## 🔄 Redémarrer un Service

```bash
docker compose restart [nom-du-service]
```

## 🎉 C'est Tout !

Votre plateforme microservices est maintenant prête à être utilisée !

### ✅ Configuration Validée

- ✅ **Keycloak** : Interface admin accessible en HTTP
- ✅ **Authentification** : Login/Register fonctionnel
- ✅ **Frontend** : Next.js avec authentification
- ✅ **Backends** : Node.js et Python avec JWT
- ✅ **Base de données** : PostgreSQL
- ✅ **Cache** : Redis
- ✅ **Gateway** : Kong
- ✅ **Utilisateurs de test** : Créés et fonctionnels

