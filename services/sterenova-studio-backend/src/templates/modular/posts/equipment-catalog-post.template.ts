import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EquipmentCatalogPostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '05_post_equipment_catalog.svg',
    displayName: 'Post Catalogue Matériel',
    description: 'Template de post catalogue de matériel avec grille moderne',
    category: 'post',
    tags: ['catalog', 'equipment', 'grid', 'modern'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'CATALOG_TITLE',
        description: 'Titre du catalogue',
        example: 'NOTRE CATALOGUE MATÉRIEL',
        required: true,
        defaultValue: 'NOTRE CATALOGUE MATÉRIEL',
      },
      {
        key: 'CATEGORY_1',
        description: 'Première catégorie',
        example: 'SON & AUDIO',
        required: false,
        defaultValue: 'SON & AUDIO',
      },
      {
        key: 'CATEGORY_2',
        description: 'Deuxième catégorie',
        example: 'LUMIÈRE & SCÈNE',
        required: false,
        defaultValue: 'LUMIÈRE & SCÈNE',
      },
      {
        key: 'CATEGORY_3',
        description: 'Troisième catégorie',
        example: 'VIDÉO & PROJ',
        required: false,
        defaultValue: 'VIDÉO & PROJ',
      },
      {
        key: 'CATEGORY_4',
        description: 'Quatrième catégorie',
        example: 'MOBILIER',
        required: false,
        defaultValue: 'MOBILIER',
      },
      {
        key: 'HANDLE',
        description: 'Handle Instagram',
        example: '@sterenova_',
        required: false,
        defaultValue: '@sterenova_',
      },
    ],
  };

  protected generateSvg(data: Record<string, string>): string {
    const {
      CATALOG_TITLE,
      CATEGORY_1,
      CATEGORY_2,
      CATEGORY_3,
      CATEGORY_4,
      HANDLE,
    } = data;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="catalogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34495e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(52,73,94,0.8);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(44,62,80,0.8);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#catalogGrad)"/>
  
  <!-- Title -->
  <text x="540" y="100" font-family="Arial, sans-serif" font-size="56" font-weight="bold" text-anchor="middle" fill="white">${CATALOG_TITLE}</text>
  
  <!-- Grid of categories -->
  ${
    CATEGORY_1
      ? `
  <rect x="90" y="180" width="400" height="180" fill="url(#cardGrad)" stroke="rgba(52,152,219,0.5)" stroke-width="3" rx="15"/>
  <text x="290" y="250" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">${CATEGORY_1}</text>
  <rect x="120" y="270" width="340" height="70" fill="rgba(52,152,219,0.2)" rx="10"/>
  <text x="290" y="315" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(52,152,219,0.8)">Icône catégorie</text>
  `
      : ''
  }
  
  ${
    CATEGORY_2
      ? `
  <rect x="590" y="180" width="400" height="180" fill="url(#cardGrad)" stroke="rgba(155,89,182,0.5)" stroke-width="3" rx="15"/>
  <text x="790" y="250" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">${CATEGORY_2}</text>
  <rect x="620" y="270" width="340" height="70" fill="rgba(155,89,182,0.2)" rx="10"/>
  <text x="790" y="315" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(155,89,182,0.8)">Icône catégorie</text>
  `
      : ''
  }
  
  ${
    CATEGORY_3
      ? `
  <rect x="90" y="400" width="400" height="180" fill="url(#cardGrad)" stroke="rgba(230,126,34,0.5)" stroke-width="3" rx="15"/>
  <text x="290" y="470" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">${CATEGORY_3}</text>
  <rect x="120" y="490" width="340" height="70" fill="rgba(230,126,34,0.2)" rx="10"/>
  <text x="290" y="535" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(230,126,34,0.8)">Icône catégorie</text>
  `
      : ''
  }
  
  ${
    CATEGORY_4
      ? `
  <rect x="590" y="400" width="400" height="180" fill="url(#cardGrad)" stroke="rgba(46,204,113,0.5)" stroke-width="3" rx="15"/>
  <text x="790" y="470" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">${CATEGORY_4}</text>
  <rect x="620" y="490" width="340" height="70" fill="rgba(46,204,113,0.2)" rx="10"/>
  <text x="790" y="535" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(46,204,113,0.8)">Icône catégorie</text>
  `
      : ''
  }
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
}
