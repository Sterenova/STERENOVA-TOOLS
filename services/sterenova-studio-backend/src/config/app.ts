export const APP_CONFIG = {
  // Nom de l'application
  name: 'Sterenova Studio',
  shortName: 'Sterenova Studio',
  
  // Version
  version: '1.0.0',
  
  // Description
  description: 'API NestJS pour la génération de templates SVG',
  
  // Métadonnées
  metadata: {
    title: 'Sterenova Studio API',
    description: 'API backend pour la génération de templates SVG professionnels',
    keywords: ['api', 'templates', 'svg', 'design', 'nestjs', 'sterenova'],
    author: 'Sterenova Studio',
    company: 'Sterenova Studio',
    
    // Handles sociaux
    social: {
      instagram: '@sterenova_studio_',
      twitter: '@sterenova_studio',
      linkedin: 'sterenova-studio',
    },
    
    // URLs
    urls: {
      website: 'https://sterenova.studio',
      api: 'https://api.sterenova.studio',
      support: 'https://support.sterenova.studio',
      docs: 'https://docs.sterenova.studio',
    }
  },
  
  // Configuration de l'API
  api: {
    prefix: 'api',
    version: 'v1',
    title: 'Sterenova Studio API',
    description: 'API pour la génération de templates SVG',
    
    // Endpoints
    endpoints: {
      health: '/health',
      templates: '/templates',
      users: '/users',
      motion: '/motion',
    }
  },
  
  // Configuration des templates
  templates: {
    // Nom du fichier ZIP de téléchargement
    downloadFilename: 'Sterenova Studio',
    
    // Handles par défaut
    defaultHandles: {
      instagram: '@sterenova_studio_',
      twitter: '@sterenova_studio',
      linkedin: 'sterenova-studio',
    },
    
    // Équipe par défaut
    defaultTeam: '— Équipe Sterenova Studio',
    
    // Auteur par défaut
    defaultAuthor: 'Sterenova Studio',
  }
} as const;

// Export des valeurs individuelles pour faciliter l'utilisation
export const APP_NAME = APP_CONFIG.name;
export const APP_SHORT_NAME = APP_CONFIG.shortName;
export const APP_VERSION = APP_CONFIG.version;
export const APP_DESCRIPTION = APP_CONFIG.description;
export const APP_METADATA = APP_CONFIG.metadata;
export const APP_API = APP_CONFIG.api;
export const APP_TEMPLATES = APP_CONFIG.templates;
export const APP_SOCIAL = APP_CONFIG.metadata.social;
export const APP_URLS = APP_CONFIG.metadata.urls; 