import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EquipmentShowcaseStoryTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '02_story_equipment_showcase.svg',
    displayName: 'Story Présentation Matériel',
    description: 'Template de story pour présenter du matériel d\'événementiel',
    category: 'story',
    tags: ['equipment', 'showcase', 'story', 'event'],
    dimensions: { width: 1080, height: 1920 },
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
        key: 'PHOTO_LABEL',
        description: 'Label pour la photo du matériel',
        example: 'Photo du matériel',
        required: false,
        defaultValue: 'Photo du matériel',
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
    const { EQUIPMENT_NAME, DESCRIPTION, FEATURES, PHOTO_LABEL, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="equipmentStoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34495e;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="highlightStoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#equipmentStoryGrad)"/>
  
  <!-- Equipment icon placeholder -->
  <rect x="390" y="200" width="300" height="300" fill="rgba(52,152,219,0.2)" stroke="rgba(52,152,219,0.5)" stroke-width="3" rx="20"/>
  <text x="540" y="350" font-family="Arial, sans-serif" font-size="64" text-anchor="middle" fill="rgba(52,152,219,0.8)">📱</text>
  
  <!-- Equipment name -->
  <text x="540" y="600" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="white">${EQUIPMENT_NAME}</text>
  
  <!-- Description -->
  ${DESCRIPTION ? `<text x="540" y="680" font-family="Arial, sans-serif" font-size="40" text-anchor="middle" fill="rgba(255,255,255,0.9)">${DESCRIPTION}</text>` : ''}
  
  <!-- Features -->
  ${FEATURES ? `<text x="540" y="760" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(52,152,219,1)">${FEATURES}</text>` : ''}
  
  <!-- Photo placeholder -->
  <rect x="40" y="900" width="1000" height="600" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="20"/>
  <text x="540" y="1200" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.8)">${PHOTO_LABEL}</text>
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="1700" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 