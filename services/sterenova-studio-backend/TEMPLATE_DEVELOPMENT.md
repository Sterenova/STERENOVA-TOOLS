# Guide de Développement des Templates

## 🚀 Ajouter un Nouveau Template en 3 Étapes

### Étape 1: Créer le fichier template
Créez un nouveau fichier dans `src/templates/modular/` :

```typescript
// src/templates/modular/my-awesome-template.template.ts
import { BaseTemplate } from '../base/base-template';
import { TemplateMetadata } from '../interfaces/template.interface';

export class MyAwesomeTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: 'my-awesome-template',
    displayName: 'Mon Template Incroyable',
    description: 'Description de mon template',
    category: 'post', // ou 'story'
    tags: ['awesome', 'modern', 'custom'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'TITLE',
        description: 'Titre principal',
        example: 'Mon Titre',
        required: true,
        defaultValue: 'Titre par défaut',
      },
      {
        key: 'SUBTITLE',
        description: 'Sous-titre',
        example: 'Mon sous-titre',
        required: false,
      },
    ],
  };

  protected generateSvg(data: Record<string, string>): string {
    const { TITLE, SUBTITLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1080" fill="#f0f0f0"/>
  <text x="540" y="300" font-family="Arial" font-size="72" text-anchor="middle">${TITLE}</text>
  ${SUBTITLE ? `<text x="540" y="400" font-family="Arial" font-size="48" text-anchor="middle">${SUBTITLE}</text>` : ''}
</svg>`;
  }
}
```

### Étape 2: Exporter le template
Ajoutez l'export dans `src/templates/modular/index.ts` :

```typescript
export { MyAwesomeTemplate } from './my-awesome-template.template';
```

### Étape 3: Enregistrer le template
Le template sera automatiquement découvert et enregistré !

## ✨ Fonctionnalités Automatiques

- **Validation des placeholders** : Vérification automatique des champs requis
- **Valeurs par défaut** : Application automatique des valeurs par défaut
- **Métadonnées** : Description, tags, dimensions automatiquement disponibles
- **Presets** : Génération automatique des exemples de données
- **Documentation Swagger** : API docs automatiquement mises à jour

## 🔧 API Endpoints Disponibles

### Templates
- `GET /api/templates/list` - Liste tous les templates avec métadonnées
- `GET /api/templates/search?q=query` - Recherche de templates
- `GET /api/templates/category/:category` - Templates par catégorie
- `GET /api/templates/info/:key` - Informations détaillées d'un template

### Génération
- `GET /api/templates/:kind/:name` - SVG avec valeurs par défaut
- `POST /api/templates/:kind/:name` - SVG personnalisé
- `GET /api/templates/presets` - Tous les presets
- `GET /api/templates/presets/:kind/:name` - Preset d'un template

### Utilitaires
- `POST /api/templates/placeholders/apply` - Remplacement de placeholders
- `GET /api/templates/archive/all.zip` - Archive ZIP
- `GET /api/templates/config/palette` - Palette de couleurs
- `GET /api/templates/config/gradient.css` - CSS de gradient

## 🎨 Bonnes Pratiques

1. **Nommage** : Utilisez des noms descriptifs et cohérents
2. **Placeholders** : Définissez des exemples et descriptions clairs
3. **Validation** : Marquez les champs requis avec `required: true`
4. **Tags** : Utilisez des tags pertinents pour la recherche
5. **Dimensions** : Spécifiez toujours la taille exacte du SVG

## 🔍 Exemple d'Utilisation

```bash
# Récupérer les infos d'un template
curl http://localhost:3000/api/templates/info/post/01_post_hero_white.svg

# Générer un SVG personnalisé
curl -X POST http://localhost:3000/api/templates/post/01_post_hero_white.svg \
  -H "Content-Type: application/json" \
  -d '{"TITLE": "Mon Titre", "SUBTITLE": "Mon sous-titre"}'

# Rechercher des templates
curl "http://localhost:3000/api/templates/search?q=hero"
```

## 🚀 Migration des Templates Existants

Les templates existants sont automatiquement convertis et restent compatibles. Pour les migrer vers le nouveau système :

1. Créez une nouvelle classe qui étend `BaseTemplate`
2. Copiez la logique SVG existante
3. Définissez les métadonnées et placeholders
4. Testez avec les nouveaux endpoints
5. Supprimez l'ancien code une fois validé

## 📚 Documentation Swagger

Visitez `/api/docs` pour voir la documentation complète de l'API avec tous les endpoints et schémas. 