# Templates Modulaires - Événementiel & Location de Matériel

Ce dossier contient 13 templates spécialement conçus pour une boîte d'événementiel et de location de matériel.

## Structure

- **Posts** : 8 templates pour les publications Instagram (format carré 1080x1080)
- **Stories** : 5 templates pour les stories Instagram (format portrait 1080x1920)

## Templates de Posts (8)

### 1. EventHeroPostTemplate
- **Nom** : `01_post_event_hero.svg`
- **Description** : Template hero moderne pour événementiel avec design premium
- **Tags** : hero, event, premium, modern
- **Placeholders** : TITLE, SUBTITLE, DATE, CTA, HANDLE

### 2. EquipmentShowcasePostTemplate
- **Nom** : `02_post_equipment_showcase.svg`
- **Description** : Template pour présenter du matériel d'événementiel
- **Tags** : equipment, showcase, professional, event
- **Placeholders** : EQUIPMENT_NAME, DESCRIPTION, FEATURES, PRICE, HANDLE

### 3. EventPackagePostTemplate
- **Nom** : `03_post_event_package.svg`
- **Description** : Template pour présenter des packages d'événementiel tout inclus
- **Tags** : package, event, all-inclusive, offer
- **Placeholders** : PACKAGE_NAME, INCLUDES, PRICE, VALIDITY, HANDLE

### 4. EventGalleryPostTemplate
- **Nom** : `04_post_event_gallery.svg`
- **Description** : Template pour présenter une galerie d'événements
- **Tags** : gallery, event, showcase, modern
- **Placeholders** : GALLERY_TITLE, EVENT_1, EVENT_2, EVENT_3, HANDLE

### 5. EquipmentCatalogPostTemplate
- **Nom** : `05_post_equipment_catalog.svg`
- **Description** : Template catalogue de matériel avec grille moderne
- **Tags** : catalog, equipment, grid, modern
- **Placeholders** : CATALOG_TITLE, CATEGORY_1, CATEGORY_2, CATEGORY_3, CATEGORY_4, HANDLE

### 6. EventCountdownPostTemplate
- **Nom** : `06_post_event_countdown.svg`
- **Description** : Template avec compte à rebours pour événement
- **Tags** : countdown, event, urgent, modern
- **Placeholders** : EVENT_NAME, DAYS_LEFT, DEADLINE, CTA, HANDLE

### 7. EquipmentSpecsPostTemplate
- **Nom** : `07_post_equipment_specs.svg`
- **Description** : Template pour présenter les spécifications techniques du matériel
- **Tags** : specs, equipment, technical, detailed
- **Placeholders** : EQUIPMENT_NAME, POWER, FREQUENCY, CONNECTIONS, HANDLE

### 8. EventTestimonialPostTemplate
- **Nom** : `08_post_event_testimonial.svg`
- **Description** : Template pour afficher un témoignage client
- **Tags** : testimonial, client, review, social-proof
- **Placeholders** : CLIENT_NAME, EVENT_TYPE, TESTIMONIAL, RATING, HANDLE

## Templates de Stories (5)

### 1. EventHeroStoryTemplate
- **Nom** : `01_story_event_hero.svg`
- **Description** : Template hero moderne pour événementiel (format story)
- **Tags** : hero, event, premium, modern, story
- **Placeholders** : TITLE, SUBTITLE, DATE, PHOTO_LABEL, HANDLE

### 2. EquipmentShowcaseStoryTemplate
- **Nom** : `02_story_equipment_showcase.svg`
- **Description** : Template story pour présenter du matériel
- **Tags** : equipment, showcase, story, event
- **Placeholders** : EQUIPMENT_NAME, DESCRIPTION, FEATURES, PHOTO_LABEL, HANDLE

### 3. EventPackageStoryTemplate
- **Nom** : `03_story_event_package.svg`
- **Description** : Template story pour présenter des packages d'événementiel
- **Tags** : package, event, all-inclusive, offer, story
- **Placeholders** : PACKAGE_NAME, INCLUDES, PRICE, VALIDITY, HANDLE

### 4. EventGalleryStoryTemplate
- **Nom** : `04_story_event_gallery.svg`
- **Description** : Template story pour présenter une galerie d'événements
- **Tags** : gallery, event, showcase, modern, story
- **Placeholders** : GALLERY_TITLE, EVENT_1, EVENT_2, EVENT_3, HANDLE

### 5. EquipmentCatalogStoryTemplate
- **Nom** : `05_story_equipment_catalog.svg`
- **Description** : Template story catalogue de matériel avec grille
- **Tags** : catalog, equipment, grid, modern, story
- **Placeholders** : CATALOG_TITLE, CATEGORY_1, CATEGORY_2, CATEGORY_3, CATEGORY_4, HANDLE

## Utilisation

### Dans le code
```typescript
import { EventHeroPostTemplate } from './posts/event-hero-post.template';

const template = new EventHeroPostTemplate();
const svg = template.generate({
  TITLE: 'SOIRÉE PRIVÉE',
  SUBTITLE: 'Lumière • Son • Scène',
  DATE: '15 DÉCEMBRE 2024',
  CTA: 'RÉSERVEZ VOTRE DATE',
  HANDLE: '@sterenova_'
});
```

### Personnalisation
Chaque template peut être personnalisé en modifiant :
- Les couleurs et gradients
- Les polices et tailles
- La disposition des éléments
- Les placeholders disponibles

## Caractéristiques

- **Format** : SVG vectoriel pour une qualité optimale
- **Responsive** : S'adapte à tous les écrans
- **Modulaire** : Structure claire et réutilisable
- **Personnalisable** : Placeholders configurables
- **Professionnel** : Design moderne et élégant

## Maintenance

- Tous les templates étendent `BaseTemplate`
- Métadonnées complètes pour chaque template
- Tags organisés pour faciliter la recherche
- Documentation des placeholders requis et optionnels

## Extension Future

Pour ajouter de nouveaux templates :
1. Créer un nouveau fichier `.template.ts`
2. Étendre la classe `BaseTemplate`
3. Définir les métadonnées et placeholders
4. Implémenter la méthode `generateSvg`
5. Ajouter l'export dans le fichier d'index approprié 