# Configuration Service

Service de configuration simple pour les frontends. Ce service fournit le logo, le nom de la marque et d'autres données configurables pour tous les frontends de la plateforme.

## 🎯 Objectif

Centraliser la configuration de la marque pour permettre aux frontends de récupérer une seule fois :
- Le logo de la marque
- Le nom de la marque
- Les couleurs de la marque
- La configuration du thème

## 🚀 Démarrage

### Développement
```bash
npm install
npm run dev
```

### Production
```bash
npm install
npm run build
npm start
```

### Docker
```bash
docker build -t config-service .
docker run -p 3003:3003 config-service
```

## 📡 Endpoints API

### Configuration de la marque
- `GET /api/config/brand/name` - Nom de la marque
- `GET /api/config/brand/logo` - Configuration du logo
- `GET /api/config/brand/colors` - Couleurs de la marque
- `GET /api/config/brand/theme` - Configuration du thème
- `GET /api/config/brand` - Configuration complète

### Santé
- `GET /api/config/health` - Health check

### Documentation
- `GET /docs` - Documentation Swagger

## 🏗️ Structure des données

La configuration contient :
- **Nom** : Nom de la marque
- **Logo** : URL, texte alternatif, dimensions
- **Couleurs** : Couleurs primaire, secondaire, accent
- **Thème** : Mode (light/dark/auto), police de caractères
- **Métadonnées** : Version, dernière mise à jour

## 🔧 Configuration

Le service est configuré via le fichier `src/services/config.service.ts` qui contient la configuration de la marque.

## 🔗 Intégration

Les frontends peuvent récupérer la configuration via :

```typescript
// Récupérer le nom de la marque
const brandName = await fetch('http://localhost:8000/api/config/brand/name');
const name = await brandName.text();

// Récupérer le logo
const logoResponse = await fetch('http://localhost:8000/api/config/brand/logo');
const logo = await logoResponse.json();

// Récupérer les couleurs
const colorsResponse = await fetch('http://localhost:8000/api/config/brand/colors');
const colors = await colorsResponse.json();

// Récupérer toute la configuration
const configResponse = await fetch('http://localhost:8000/api/config/brand');
const config = await configResponse.json();
```

## 🎨 Utilisation des données

```typescript
// Utiliser les couleurs
const primaryColor = config.colors.primary;
const logoUrl = config.logo.url;

// Appliquer le thème
document.body.style.fontFamily = config.theme.fontFamily;
document.documentElement.setAttribute('data-theme', config.theme.mode);

// Afficher le logo
const logoElement = document.createElement('img');
logoElement.src = config.logo.url;
logoElement.alt = config.logo.alt;
logoElement.width = config.logo.width;
logoElement.height = config.logo.height;
```
