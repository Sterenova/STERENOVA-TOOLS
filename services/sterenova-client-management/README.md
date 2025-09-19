# Sterenova Client Management Service

Service de gestion centralisée des clients pour l'écosystème Sterenova.

## Description

Ce microservice permet de gérer de manière centralisée tous les clients de l'écosystème Sterenova. Il offre des fonctionnalités CRUD complètes pour la gestion des informations clients, avec support pour la pagination, les filtres, et la recherche.

## Fonctionnalités

- ✅ **Gestion CRUD complète** : Création, lecture, mise à jour et suppression de clients
- ✅ **Recherche et filtres** : Recherche par nom, email, entreprise avec filtres par statut et type
- ✅ **Pagination** : Support de la pagination pour les grandes listes
- ✅ **Soft Delete** : Suppression logique avec possibilité de restauration
- ✅ **Authentification** : Intégration avec Keycloak pour la sécurité
- ✅ **Validation** : Validation des données avec class-validator
- ✅ **Documentation API** : Documentation Swagger automatique
- ✅ **Health Checks** : Endpoints de santé pour le monitoring
- ✅ **Statistiques** : Endpoints pour obtenir des statistiques sur les clients

## Technologies

- **Framework** : NestJS
- **Base de données** : PostgreSQL avec TypeORM
- **Authentification** : JWT avec Keycloak
- **Documentation** : Swagger/OpenAPI
- **Validation** : class-validator
- **Containerisation** : Docker

## Structure des données

### Client

```typescript
{
  id: string;              // UUID unique
  firstName: string;       // Prénom
  lastName: string;        // Nom
  email: string;          // Email (unique)
  phone?: string;         // Téléphone
  company?: string;       // Entreprise
  address?: string;       // Adresse
  postalCode?: string;    // Code postal
  city?: string;          // Ville
  country?: string;       // Pays
  notes?: string;         // Notes
  status: string;         // Statut (active, inactive, suspended)
  customerType?: string;  // Type (individual, business, government)
  taxNumber?: string;     // Numéro de TVA
  dateOfBirth?: Date;     // Date de naissance
  metadata?: object;      // Métadonnées personnalisées
  createdAt: Date;        // Date de création
  updatedAt: Date;        // Date de modification
  deletedAt?: Date;       // Date de suppression (soft delete)
}
```

## API Endpoints

### Clients

- `GET /clients` - Liste des clients (avec pagination et filtres)
- `GET /clients/stats` - Statistiques des clients
- `GET /clients/:id` - Détails d'un client
- `GET /clients/email/:email` - Recherche par email
- `POST /clients` - Créer un nouveau client
- `PATCH /clients/:id` - Mettre à jour un client
- `DELETE /clients/:id` - Supprimer un client (soft delete)
- `PATCH /clients/:id/restore` - Restaurer un client supprimé

### Authentification

- `GET /auth/profile` - Profil de l'utilisateur connecté

### Santé

- `GET /health` - État de santé général
- `GET /health/ready` - Vérification de disponibilité
- `GET /health/live` - Vérification de vie

## Configuration

### Variables d'environnement

```bash
# Application
APP_PORT=3004
APP_ENV=development

# Base de données
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=platform
DB_PASSWORD=platform
DB_DATABASE=client_management

# Keycloak
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=platform
KEYCLOAK_CLIENT_ID=client-management-service
KEYCLOAK_CLIENT_SECRET=client-management-secret

# JWT
JWT_SECRET=sterenova-client-management-secret
JWT_EXPIRES_IN=24h

# Swagger
SWAGGER_TITLE=Sterenova Client Management API
SWAGGER_DESCRIPTION=API pour la gestion centralisée des clients
SWAGGER_VERSION=1.0
```

## Démarrage

### Développement

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run start:dev

# L'API sera disponible sur http://localhost:3004
# La documentation Swagger sur http://localhost:3004/api
```

### Production avec Docker

```bash
# Build de l'image
docker build -t sterenova-client-management .

# Exécution
docker run -p 3004:3004 sterenova-client-management
```

### Développement avec Docker

```bash
# Build de l'image de développement
docker build -f Dockerfile.dev -t sterenova-client-management:dev .

# Exécution avec volume pour le hot reload
docker run -p 3004:3004 -v $(pwd):/app sterenova-client-management:dev
```

## Base de données

Le service utilise PostgreSQL avec TypeORM. Les migrations sont automatiques en mode développement.

### Création de la base de données

```sql
CREATE DATABASE client_management;
```

## Rôles et permissions

- **admin** : Accès complet à toutes les fonctionnalités
- **manager** : Accès à la gestion des clients et aux statistiques
- **user** : Accès en lecture seule aux clients

## Intégration avec d'autres services

Ce service est conçu pour être utilisé par les autres microservices de l'écosystème Sterenova :

- **sterenova-flux-backend** : Pour la gestion des clients dans les devis et factures
- **sterenova-studio-backend** : Pour la gestion des clients dans les projets

### Utilisation depuis d'autres services

```typescript
// Exemple d'utilisation depuis un autre service
const clientService = new ClientManagementService();
const client = await clientService.findByEmail('client@example.com');
```

## Monitoring

Le service expose des endpoints de santé pour le monitoring :

- `/health` : État général du service
- `/health/ready` : Vérification que le service est prêt à recevoir des requêtes
- `/health/live` : Vérification que le service est en vie

## Développement

### Scripts disponibles

```bash
npm run build          # Build de l'application
npm run start          # Démarrage en production
npm run start:dev      # Démarrage en développement
npm run start:debug    # Démarrage en mode debug
npm run lint           # Linting du code
npm run test           # Tests unitaires
npm run test:watch     # Tests en mode watch
npm run test:cov       # Tests avec couverture
npm run test:e2e       # Tests end-to-end
```

### Structure du projet

```
src/
├── auth/              # Module d'authentification
├── clients/           # Module de gestion des clients
├── config/            # Configuration de l'application
├── health/            # Module de santé
├── app.module.ts      # Module principal
└── main.ts           # Point d'entrée
```

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request
