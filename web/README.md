# 🌐 Applications Web Sterenova

Cette section contient les applications frontend de la plateforme Sterenova, organisées dans STERENOVA-TOOLS.

## 🎨 Applications Frontend

### STERENOVA-FLUX-FRONTEND
- **Port**: 3003
- **URL**: http://localhost:3003
- **URL Gateway**: http://localhost:8000/flux
- **Technologie**: Next.js 14 + React 18 + TypeScript
- **UI**: Tailwind CSS + shadcn/ui + Radix UI
- **Authentification**: Keycloak JS avec PKCE
- **Fonctionnalités**: 
  - Gestion des devis et factures
  - Dashboard avec statistiques
  - Interface moderne et responsive

### STERENOVA-STUDIO-FRONTEND
- **Port**: 3001
- **URL**: http://localhost:3001
- **URL Gateway**: http://localhost:8000/studio
- **Technologie**: Next.js 14 + React 18 + TypeScript
- **UI**: Tailwind CSS + shadcn/ui + Radix UI
- **Authentification**: Keycloak JS avec PKCE
- **Fonctionnalités**:
  - Génération de templates SVG
  - Éditeur de motions
  - Interface créative et intuitive

## 🔐 Authentification

Les deux applications utilisent Keycloak pour l'authentification :

```typescript
// Configuration Keycloak
const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
};
```

### Flux d'authentification
1. L'utilisateur accède à l'application
2. Vérification automatique de l'authentification (SSO)
3. Si non authentifié, redirection vers Keycloak
4. Retour avec token JWT
5. Stockage sécurisé du token
6. Utilisation pour les appels API

## 🛠️ Développement

### Prérequis
- Node.js 18+
- npm 8+

### Installation et démarrage

```bash
# Flux Frontend
cd web/sterenova-flux-frontend
npm install
npm run dev

# Studio Frontend
cd web/sterenova-studio-frontend
npm install
npm run dev
```

### Variables d'environnement

```bash
# .env.local
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=platform
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=frontend-app
NEXT_PUBLIC_API_URL=http://localhost:8000/api/flux  # ou /api/studio
```

## 🎯 Fonctionnalités Clés

### Flux Frontend
- **Dashboard**: Vue d'ensemble des devis et factures
- **Gestion des devis**: Création, modification, suivi
- **Gestion des factures**: Génération, envoi, suivi des paiements
- **Utilisateurs**: Gestion des équipes et permissions
- **Rapports**: Statistiques et analyses

### Studio Frontend
- **Éditeur de templates**: Interface drag & drop
- **Motions**: Création d'animations SVG
- **Bibliothèque**: Gestion des templates
- **Export**: Génération de fichiers SVG/PDF
- **Prévisualisation**: Aperçu en temps réel

## 🔧 Architecture Technique

### Structure des composants
```
src/
├── app/                 # Pages Next.js (App Router)
├── components/         # Composants réutilisables
│   ├── ui/            # Composants UI de base
│   └── features/      # Composants métier
├── contexts/          # Contextes React (Auth, Theme)
├── hooks/            # Hooks personnalisés
├── lib/              # Utilitaires et configurations
├── services/         # Services API
└── types/            # Types TypeScript
```

### Gestion d'état
- **Context API**: Authentification et thème
- **React Hook Form**: Formulaires
- **TanStack Query**: Cache et synchronisation des données

### Styling
- **Tailwind CSS**: Framework CSS utility-first
- **shadcn/ui**: Composants UI pré-construits
- **Radix UI**: Primitives accessibles
- **Lucide React**: Icônes

## 🚀 Déploiement

### Production
```bash
# Build
npm run build

# Start
npm run start
```

### Docker
```bash
# Build image
docker build -t sterenova-flux-frontend .

# Run container
docker run -p 3003:3000 sterenova-flux-frontend
```

## 🔍 Debugging

### Outils de développement
- **React DevTools**: Inspection des composants
- **Next.js DevTools**: Analyse des performances
- **Keycloak DevTools**: Debug de l'authentification

### Logs
```bash
# Logs de développement
npm run dev

# Logs de production
npm run start
```




