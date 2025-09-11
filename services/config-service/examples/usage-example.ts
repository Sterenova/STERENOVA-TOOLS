/**
 * Exemple d'utilisation du service de configuration
 * Ce fichier montre comment récupérer et utiliser la configuration de la marque
 */

// Types pour la configuration
interface BrandConfig {
  name: string;
  logo: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  theme: {
    mode: 'light' | 'dark' | 'auto';
    fontFamily: string;
  };
  metadata: {
    version: string;
    lastUpdated: string;
  };
}

// Service de configuration
class ConfigService {
  private baseUrl: string;
  private cache: Map<string, any> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor(baseUrl: string = 'http://localhost:8000/api/config') {
    this.baseUrl = baseUrl;
  }

  /**
   * Récupère le nom de la marque
   */
  async getBrandName(): Promise<string> {
    const cacheKey = 'brand-name';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.baseUrl}/brand/name`);
      const name = await response.text();
      this.setCache(cacheKey, name);
      return name;
    } catch (error) {
      console.error('Erreur lors de la récupération du nom de la marque:', error);
      return 'Plateforme Microservices';
    }
  }

  /**
   * Récupère le logo de la marque
   */
  async getLogo(): Promise<BrandConfig['logo']> {
    const cacheKey = 'brand-logo';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.baseUrl}/brand/logo`);
      const logo = await response.json();
      this.setCache(cacheKey, logo);
      return logo;
    } catch (error) {
      console.error('Erreur lors de la récupération du logo:', error);
      return {
        url: '/logos/default-logo.svg',
        alt: 'Logo par défaut',
        width: 120,
        height: 40
      };
    }
  }

  /**
   * Récupère les couleurs de la marque
   */
  async getColors(): Promise<BrandConfig['colors']> {
    const cacheKey = 'brand-colors';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.baseUrl}/brand/colors`);
      const colors = await response.json();
      this.setCache(cacheKey, colors);
      return colors;
    } catch (error) {
      console.error('Erreur lors de la récupération des couleurs:', error);
      return {
        primary: '#0070f3',
        secondary: '#ffffff',
        accent: '#00d4aa'
      };
    }
  }

  /**
   * Récupère la configuration du thème
   */
  async getTheme(): Promise<BrandConfig['theme']> {
    const cacheKey = 'brand-theme';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.baseUrl}/brand/theme`);
      const theme = await response.json();
      this.setCache(cacheKey, theme);
      return theme;
    } catch (error) {
      console.error('Erreur lors de la récupération du thème:', error);
      return {
        mode: 'auto',
        fontFamily: 'Inter, system-ui, sans-serif'
      };
    }
  }

  /**
   * Récupère toute la configuration de la marque
   */
  async getFullConfig(): Promise<BrandConfig> {
    const cacheKey = 'brand-full-config';
    const cached = this.getFromCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.baseUrl}/brand`);
      const config = await response.json();
      this.setCache(cacheKey, config);
      return config;
    } catch (error) {
      console.error('Erreur lors de la récupération de la configuration complète:', error);
      return {
        name: 'Plateforme Microservices',
        logo: {
          url: '/logos/default-logo.svg',
          alt: 'Logo par défaut',
          width: 120,
          height: 40
        },
        colors: {
          primary: '#0070f3',
          secondary: '#ffffff',
          accent: '#00d4aa'
        },
        theme: {
          mode: 'auto',
          fontFamily: 'Inter, system-ui, sans-serif'
        },
        metadata: {
          version: '1.0.0',
          lastUpdated: new Date().toISOString()
        }
      };
    }
  }

  /**
   * Gestion du cache
   */
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Vide le cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Exemple d'utilisation
async function exampleUsage() {
  const configService = new ConfigService();

  console.log('🔍 Récupération de la configuration de la marque...');
  
  console.log('\n📝 Nom de la marque:');
  const brandName = await configService.getBrandName();
  console.log(`✅ ${brandName}`);

  console.log('\n🎨 Logo:');
  const logo = await configService.getLogo();
  console.log(`✅ ${logo.alt} - ${logo.url} (${logo.width}x${logo.height})`);

  console.log('\n🌈 Couleurs:');
  const colors = await configService.getColors();
  console.log(`✅ Primaire: ${colors.primary}`);
  console.log(`✅ Secondaire: ${colors.secondary}`);
  console.log(`✅ Accent: ${colors.accent}`);

  console.log('\n🎭 Thème:');
  const theme = await configService.getTheme();
  console.log(`✅ Mode: ${theme.mode}`);
  console.log(`✅ Police: ${theme.fontFamily}`);

  console.log('\n📋 Configuration complète:');
  const fullConfig = await configService.getFullConfig();
  console.log(`✅ Version: ${fullConfig.metadata.version}`);
  console.log(`✅ Dernière mise à jour: ${fullConfig.metadata.lastUpdated}`);

  console.log('\n✅ Exemple terminé !');
}

// Exécuter l'exemple si ce fichier est exécuté directement
if (require.main === module) {
  exampleUsage().catch(console.error);
}

export default ConfigService;
