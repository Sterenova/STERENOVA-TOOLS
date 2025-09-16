# Fonctionnalités de Base de Données - Système de Templates

Ce document décrit les nouvelles fonctionnalités de base de données implémentées pour le système de templates.

## 🗄️ Tables Créées

### 1. `download_history`
Sauvegarde l'historique de tous les téléchargements de templates.

**Champs :**
- `id` : Identifiant unique UUID
- `template_name` : Nom du template téléchargé
- `template_category` : Catégorie (post/story)
- `template_parameters` : Paramètres utilisés (JSONB)
- `file_name` : Nom du fichier généré
- `file_format` : Format du fichier (svg, zip, etc.)
- `file_size` : Taille du fichier en bytes
- `ip_address` : Adresse IP de l'utilisateur
- `user_agent` : User-Agent du navigateur
- `user_id` : ID de l'utilisateur (optionnel)
- `downloaded_at` : Date et heure du téléchargement

**Utilisation :**
- Suivi des templates les plus populaires
- Analyse des paramètres les plus utilisés
- Statistiques d'utilisation
- Audit des téléchargements

### 2. `favorite_templates`
Gère les templates favoris des utilisateurs.

**Champs :**
- `id` : Identifiant unique UUID
- `template_name` : Nom du template
- `template_category` : Catégorie (post/story)
- `default_parameters` : Paramètres par défaut (JSONB)
- `notes` : Notes personnelles de l'utilisateur
- `usage_count` : Nombre d'utilisations
- `user_id` : ID de l'utilisateur
- `created_at` : Date de création
- `updated_at` : Date de dernière modification

**Utilisation :**
- Sauvegarde des templates préférés
- Paramètres personnalisés par défaut
- Suivi de l'utilisation des favoris
- Interface utilisateur personnalisée

### 3. `svg_settings`
Gère les paramètres généraux des SVG (globaux et par utilisateur).

**Champs :**
- `id` : Identifiant unique UUID
- `setting_key` : Clé du paramètre
- `setting_name` : Nom affiché du paramètre
- `description` : Description du paramètre
- `value` : Valeur du paramètre (JSONB)
- `value_type` : Type de valeur (string, number, boolean, object, array)
- `is_global` : Si le paramètre est global
- `category` : Catégorie du paramètre
- `priority` : Priorité d'affichage
- `user_id` : ID de l'utilisateur (null pour global)
- `created_at` : Date de création
- `updated_at` : Date de dernière modification

**Utilisation :**
- Paramètres par défaut des SVG
- Personnalisation par utilisateur
- Configuration globale du système
- Gestion des thèmes et styles

## 🔧 API Endpoints

### Historique des Téléchargements
- `POST /download-history` - Créer un enregistrement de téléchargement
- `GET /download-history/user/:userId` - Historique d'un utilisateur
- `GET /download-history/template/:templateName` - Historique d'un template
- `GET /download-history/stats` - Statistiques des téléchargements
- `DELETE /download-history/cleanup` - Nettoyage de l'historique ancien

### Templates Favoris
- `POST /favorite-templates` - Ajouter aux favoris
- `GET /favorite-templates/user/:userId` - Favoris d'un utilisateur
- `GET /favorite-templates/user/:userId/category/:category` - Favoris par catégorie
- `GET /favorite-templates/user/:userId/most-used` - Favoris les plus utilisés
- `GET /favorite-templates/user/:userId/is-favorite/:templateName` - Vérifier si favori
- `PUT /favorite-templates/:id` - Modifier un favori
- `DELETE /favorite-templates/:id` - Supprimer des favoris
- `POST /favorite-templates/:id/increment-usage` - Incrémenter le compteur d'usage

### Paramètres SVG
- `POST /svg-settings` - Créer un paramètre
- `GET /svg-settings/user/:userId` - Paramètres d'un utilisateur
- `GET /svg-settings/global` - Paramètres globaux
- `GET /svg-settings/merged/:userId` - Paramètres fusionnés (global + utilisateur)
- `GET /svg-settings/category/:category` - Paramètres par catégorie
- `GET /svg-settings/key/:settingKey` - Paramètre par clé
- `PUT /svg-settings/:id` - Modifier un paramètre
- `DELETE /svg-settings/:id` - Supprimer un paramètre
- `POST /svg-settings/user/:userId/defaults` - Créer les paramètres par défaut

### Templates (Mise à jour)
- `GET /templates/user/:userId/favorites` - Favoris d'un utilisateur
- `POST /templates/user/:userId/favorites` - Ajouter aux favoris
- `DELETE /templates/user/:userId/favorites/:favoriteId` - Retirer des favoris
- `GET /templates/user/:userId/settings` - Paramètres d'un utilisateur
- `POST /templates/user/:userId/settings/:settingKey` - Mettre à jour un paramètre

## 🚀 Fonctionnalités Avancées

### Sauvegarde Automatique
- L'historique des téléchargements est automatiquement sauvegardé
- Les paramètres utilisés sont enregistrés
- Support des téléchargements en lot (ZIP)

### Paramètres Fusionnés
- Les paramètres utilisateur remplacent les paramètres globaux
- Système de priorité pour l'ordre d'affichage
- Catégorisation automatique des paramètres

### Statistiques et Analytics
- Comptage des téléchargements par template
- Suivi de l'utilisation des favoris
- Analyse des paramètres populaires
- Nettoyage automatique de l'historique ancien

## 📊 Exemples d'Utilisation

### Créer un Favori
```json
POST /favorite-templates
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "templateName": "hero-post",
  "templateCategory": "post",
  "defaultParameters": {
    "TITLE": "Mon Titre",
    "SUBTITLE": "Mon Sous-titre"
  },
  "notes": "Template pour les posts hero"
}
```

### Mettre à Jour un Paramètre
```json
POST /templates/user/123e4567-e89b-12d3-a456-426614174000/settings/defaultWidth
{
  "value": 1200,
  "settingName": "Largeur personnalisée",
  "description": "Largeur personnalisée pour mes templates"
}
```

### Obtenir les Paramètres Fusionnés
```bash
GET /svg-settings/merged/123e4567-e89b-12d3-a456-426614174000
```

## 🔒 Sécurité

- Toutes les opérations sont liées à un utilisateur spécifique
- Les paramètres globaux ne peuvent être modifiés que par les administrateurs
- Validation des données avec class-validator
- Gestion des erreurs et rollback automatique

## 📈 Performance

- Index sur les clés de recherche fréquentes
- Pagination des résultats d'historique
- Nettoyage automatique des données anciennes
- Optimisation des requêtes avec TypeORM

## 🛠️ Maintenance

### Nettoyage de l'Historique
```bash
DELETE /download-history/cleanup?days=90
```

### Création des Paramètres par Défaut
```bash
POST /svg-settings/user/123e4567-e89b-12d3-a456-426614174000/defaults
```

## 🔄 Migration

Le fichier `001-create-user-tables.sql` contient la migration complète pour créer toutes les tables et index nécessaires.

```bash
# Exécuter la migration
psql -d your_database -f src/database/migrations/001-create-user-tables.sql
``` 