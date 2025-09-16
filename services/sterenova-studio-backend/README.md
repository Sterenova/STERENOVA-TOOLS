# Sterenova Studio Backend

API NestJS pour la génération de templates SVG Sterenova Studio.

## 🚀 Démarrage rapide

### Développement local

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run start:dev

# L'API sera disponible sur http://localhost:3000
```

### Build et production

```bash
# Build de production
npm run build

# Démarrer en mode production
npm run start:prod
```

## 🔄 CI/CD et Docker Hub

### Configuration requise

Dans votre repo GitHub → Settings → Secrets and variables → Actions, ajoutez :

```
DOCKER_USERNAME=votre_username_docker_hub
DOCKER_TOKEN=votre_access_token_docker_hub
```

### Workflow automatique

- **Push sur main/develop** → Build et push automatique sur Docker Hub
- **Tags** → Build et push avec version spécifique
- **Images générées** : `sterenova/sterenova-backend:latest`

### Créer une release

```bash
# Créer une nouvelle version
./release.sh v1.0.0 "Description de la release"

# La CI fera automatiquement :
# 1. Build de l'image Docker
# 2. Push sur Docker Hub avec le tag v1.0.0
# 3. Coolify détectera et redéploiera
```

## 📦 Images Docker Hub

### Tags disponibles
- `latest` - Dernière version de la branche main
- `v1.0.0` - Version spécifique
- `main-<sha>` - Version de la branche main
- `develop-<sha>` - Version de la branche develop

### Utilisation avec Coolify

Dans Coolify, configurez l'application avec :
- **Image** : `sterenova/sterenova-backend:latest`
- **Port** : 3000
- **Variables d'environnement** : Voir `env.prod`

## 🔧 Configuration

### Variables d'environnement

#### Développement (`env.local`)
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=app
```

#### Production (Coolify)
```
NODE_ENV=production
PORT=3000
DB_HOST=sterenova-postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_NAME=sterenova
```

## 📊 API Endpoints

- **Health Check** : `GET /api/health`
- **Templates** : `GET /api/templates`
- **Génération** : `POST /api/templates/:key/generate`

## 🏗️ Architecture

- **Framework** : NestJS (Node.js)
- **Base de données** : PostgreSQL avec TypeORM
- **Validation** : Class-validator
- **Documentation** : Swagger/OpenAPI

## 🔍 Monitoring

### Health Check
```bash
curl http://localhost:3000/api/health
# Réponse: {"status":"ok"}
```

### Logs
- **Développement** : Console
- **Production** : Coolify logs

## 🚨 Dépannage

### Problèmes courants
1. **Port déjà utilisé** → Vérifiez qu'aucun autre service n'utilise le port 3000
2. **Base de données** → Vérifiez la connexion PostgreSQL
3. **Variables d'environnement** → Vérifiez le fichier `env.local`

### Logs détaillés
```bash
# Mode debug
DEBUG=* npm run start:dev
```

---

**🎯 Ce repo Sterenova Studio est configuré pour un déploiement automatique avec Coolify !**
