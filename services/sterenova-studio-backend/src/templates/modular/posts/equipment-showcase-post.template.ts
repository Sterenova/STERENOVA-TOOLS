import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EquipmentShowcasePostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '02_post_equipment_showcase.svg',
    displayName: 'Post Présentation Matériel',
    description: 'Template de post pour présenter du matériel d\'événementiel avec design professionnel',
    category: 'post',
    tags: ['equipment', 'showcase', 'professional', 'event'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'EQUIPMENT_NAME',
        description: 'Nom du matériel',
        example: 'SYSTÈME SON PRO',
        required: true,
        defaultValue: 'SYSTÈME SON PRO',
      },
      {
        key: 'DESCRIPTION',
        description: 'Description du matériel',
        example: 'Son surround 5.1 • 2000W RMS',
        required: false,
        defaultValue: 'Son surround 5.1 • 2000W RMS',
      },
      {
        key: 'FEATURES',
        description: 'Caractéristiques principales',
        example: 'Bluetooth • WiFi • App mobile',
        required: false,
        defaultValue: 'Bluetooth • WiFi • App mobile',
      },
      {
        key: 'PRICE',
        description: 'Prix de location',
        example: 'À partir de 150€/jour',
        required: false,
        defaultValue: 'À partir de 150€/jour',
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
    const { EQUIPMENT_NAME, DESCRIPTION, FEATURES, PRICE, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="equipmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34495e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#equipmentGrad)"/>
  
  <!-- Equipment icon placeholder -->
  <rect x="390" y="150" width="300" height="300" fill="rgba(52,152,219,0.2)" stroke="rgba(52,152,219,0.5)" stroke-width="3" rx="20"/>
  <text x="540" y="300" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="rgba(52,152,219,0.8)">📱</text>
  
  <!-- Equipment name -->
  <text x="540" y="520" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">${EQUIPMENT_NAME}</text>
  
  <!-- Description -->
  ${DESCRIPTION ? `<text x="540" y="590" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)">${DESCRIPTION}</text>` : ''}
  
  <!-- Features -->
  ${FEATURES ? `<text x="540" y="650" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(52,152,219,1)">${FEATURES}</text>` : ''}
  
  <!-- Price -->
  ${PRICE ? `
  <rect x="240" y="720" width="600" height="80" fill="url(#highlightGrad)" rx="40"/>
  <text x="540" y="770" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">${PRICE}</text>
  ` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 