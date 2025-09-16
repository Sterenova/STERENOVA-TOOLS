import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EquipmentSpecsPostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '07_post_equipment_specs.svg',
    displayName: 'Post Spécifications Matériel',
    description: 'Template de post pour présenter les spécifications techniques du matériel',
    category: 'post',
    tags: ['specs', 'equipment', 'technical', 'detailed'],
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
        key: 'POWER',
        description: 'Puissance',
        example: '2000W RMS',
        required: false,
        defaultValue: '2000W RMS',
      },
      {
        key: 'FREQUENCY',
        description: 'Fréquence de réponse',
        example: '20Hz - 20kHz',
        required: false,
        defaultValue: '20Hz - 20kHz',
      },
      {
        key: 'CONNECTIONS',
        description: 'Types de connexions',
        example: 'XLR • Jack • RCA • Bluetooth',
        required: false,
        defaultValue: 'XLR • Jack • RCA • Bluetooth',
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
    const { EQUIPMENT_NAME, POWER, FREQUENCY, CONNECTIONS, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="specsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#27ae60;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2ecc71;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="specCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0.05);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#specsGrad)"/>
  
  <!-- Equipment name -->
  <text x="540" y="120" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">${EQUIPMENT_NAME}</text>
  
  <!-- Specs cards -->
  ${POWER ? `
  <rect x="90" y="200" width="400" height="150" fill="url(#specCardGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="15"/>
  <text x="290" y="250" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="white">PUISSANCE</text>
  <text x="290" y="300" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(39,174,96,1)">${POWER}</text>
  ` : ''}
  
  ${FREQUENCY ? `
  <rect x="590" y="200" width="400" height="150" fill="url(#specCardGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="15"/>
  <text x="790" y="250" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="white">FRÉQUENCE</text>
  <text x="790" y="300" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(39,174,96,1)">${FREQUENCY}</text>
  ` : ''}
  
  ${CONNECTIONS ? `
  <rect x="340" y="400" width="400" height="150" fill="url(#specCardGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="15"/>
  <text x="540" y="450" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="white">CONNEXIONS</text>
  <text x="540" y="500" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(39,174,96,1)">${CONNECTIONS}</text>
  ` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 