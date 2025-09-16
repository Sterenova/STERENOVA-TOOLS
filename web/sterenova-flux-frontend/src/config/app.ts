export const APP_CONFIG = {
  // Nom de l'application
  name: 'Sterenova Flux',
  shortName: 'Sterenova Flux',
  
  // Version
  version: '1.0.0',
  
  // Description
  description: 'Gestion des devis et factures',
  
  // Métadonnées
  metadata: {
    title: 'Sterenova Flux - Gestion des devis et factures',
    description: 'Application de gestion des devis et factures Sterenova',
    keywords: ['devis', 'factures', 'gestion', 'clients', 'sterenova', 'flux'],
    author: 'Sterenova Flux',
    company: 'Sterenova Flux',
    
    // Handles sociaux
    social: {
      instagram: '@sterenova_',
      twitter: '@sterenova_',
      linkedin: 'sterenova_',
    },
    
    // URLs
    urls: {
      website: 'https://sterenova.fr',
      api: 'https://api.flux.sterenova.fr',
      support: 'https://support.sterenova.fr',
    }
  },
  
  // Configuration de l'interface
  ui: {
    brand: {
      logo: '/logo.svg',
      favicon: '/logo.svg',
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
    },
    
    // Textes de l'interface
    labels: {
      welcome: 'Bienvenue dans Sterenova Flux',
      dashboard: 'Tableau de bord Sterenova Flux',
      quotes: 'Devis Sterenova Flux',
      invoices: 'Factures Sterenova Flux',
      clients: 'Clients Sterenova Flux',
      settings: 'Paramètres Sterenova Flux',
    }
  }
} as const;

// Export des valeurs individuelles pour faciliter l'utilisation
export const APP_NAME = 'Sterenova Flux';
export const APP_SHORT_NAME = APP_CONFIG.shortName;
export const APP_VERSION = APP_CONFIG.version;
export const APP_DESCRIPTION = 'Plateforme de gestion commerciale complète';
export const APP_METADATA = APP_CONFIG.metadata;
export const APP_UI = APP_CONFIG.ui;
export const APP_LABELS = APP_CONFIG.ui.labels;
export const APP_SOCIAL = APP_CONFIG.metadata.social;
export const APP_URLS = APP_CONFIG.metadata.urls;
