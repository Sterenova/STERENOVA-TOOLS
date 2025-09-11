import { Injectable } from '@nestjs/common';

export interface BrandConfig {
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

@Injectable()
export class ConfigService {
  private readonly brandConfig: BrandConfig = {
    name: 'Plateforme Microservices',
    logo: {
      url: '/logos/platform-logo.svg',
      alt: 'Logo Plateforme Microservices',
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

  getBrandName(): string {
    return this.brandConfig.name;
  }

  getLogo(): BrandConfig['logo'] {
    return this.brandConfig.logo;
  }

  getColors(): BrandConfig['colors'] {
    return this.brandConfig.colors;
  }

  getTheme(): BrandConfig['theme'] {
    return this.brandConfig.theme;
  }

  getFullConfig(): BrandConfig {
    return {
      ...this.brandConfig,
      metadata: {
        ...this.brandConfig.metadata,
        lastUpdated: new Date().toISOString()
      }
    };
  }
}
