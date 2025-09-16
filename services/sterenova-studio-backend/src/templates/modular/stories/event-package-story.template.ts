import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EventPackageStoryTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '03_story_event_package.svg',
    displayName: 'Story Package Événementiel',
    description: 'Template de story pour présenter des packages d\'événementiel tout inclus',
    category: 'story',
    tags: ['package', 'event', 'all-inclusive', 'offer', 'story'],
    dimensions: { width: 1080, height: 1920 },
    placeholders: [
      {
        key: 'PACKAGE_NAME',
        description: 'Nom du package',
        example: 'PACKAGE MARIAGE PREMIUM',
        required: true,
        defaultValue: 'PACKAGE MARIAGE PREMIUM',
      },
      {
        key: 'INCLUDES',
        description: 'Ce qui est inclus',
        example: 'Son • Lumière • Scène • Photo',
        required: false,
        defaultValue: 'Son • Lumière • Scène • Photo',
      },
      {
        key: 'PRICE',
        description: 'Prix du package',
        example: 'À partir de 2500€',
        required: false,
        defaultValue: 'À partir de 2500€',
      },
      {
        key: 'VALIDITY',
        description: 'Validité de l\'offre',
        example: 'Offre limitée • Réservation 2024',
        required: false,
        defaultValue: 'Offre limitée • Réservation 2024',
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
    const { PACKAGE_NAME, INCLUDES, PRICE, VALIDITY, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="packageStoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8e44ad;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9b59b6;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="goldStoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f39c12;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e67e22;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#packageStoryGrad)"/>
  
  <!-- Package icon -->
  <rect x="440" y="150" width="200" height="200" fill="rgba(243,156,18,0.2)" stroke="rgba(243,156,18,0.6)" stroke-width="4" rx="20"/>
  <text x="540" y="250" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" fill="rgba(243,156,18,0.8)">🎁</text>
  
  <!-- Package name -->
  <text x="540" y="450" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">${PACKAGE_NAME}</text>
  
  <!-- What\'s included -->
  ${INCLUDES ? `<text x="540" y="540" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="rgba(255,255,255,0.9)">${INCLUDES}</text>` : ''}
  
  <!-- Price -->
  ${PRICE ? `
  <rect x="190" y="650" width="700" height="120" fill="url(#goldStoryGrad)" rx="60"/>
  <text x="540" y="720" font-family="Arial, sans-serif" font-size="44" font-weight="bold" text-anchor="middle" fill="white">${PRICE}</text>
  ` : ''}
  
  <!-- Validity -->
  ${VALIDITY ? `<text x="540" y="800" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(243,156,18,1)">${VALIDITY}</text>` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="1700" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 