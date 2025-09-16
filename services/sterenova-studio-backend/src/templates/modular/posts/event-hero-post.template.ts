import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EventHeroPostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '01_post_event_hero.svg',
    displayName: 'Post Hero Événementiel',
    description: 'Template de post hero moderne pour événementiel avec design premium',
    category: 'post',
    tags: ['hero', 'event', 'premium', 'modern'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'TITLE',
        description: 'Titre principal de l\'événement',
        example: 'SOIRÉE PRIVÉE',
        required: true,
        defaultValue: 'SOIRÉE PRIVÉE',
      },
      {
        key: 'SUBTITLE',
        description: 'Sous-titre descriptif',
        example: 'Lumière • Son • Scène',
        required: false,
        defaultValue: 'Lumière • Son • Scène',
      },
      {
        key: 'DATE',
        description: 'Date de l\'événement',
        example: '15 DÉCEMBRE 2024',
        required: false,
        defaultValue: '15 DÉCEMBRE 2024',
      },
      {
        key: 'CTA',
        description: 'Call to action',
        example: 'RÉSERVEZ VOTRE DATE',
        required: false,
        defaultValue: 'RÉSERVEZ VOTRE DATE',
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
    const { TITLE, SUBTITLE, DATE, CTA, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="eventGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e94560;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff6b6b;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#eventGrad1)"/>
  
  <!-- Decorative elements -->
  <circle cx="200" cy="200" r="150" fill="rgba(233,69,96,0.1)"/>
  <circle cx="880" cy="880" r="120" fill="rgba(255,107,107,0.1)"/>
  
  <!-- Main content area -->
  <rect x="90" y="240" width="900" height="600" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2" rx="20"/>
  
  <!-- Title -->
  <text x="540" y="380" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="white">${TITLE}</text>
  
  <!-- Subtitle -->
  ${SUBTITLE ? `<text x="540" y="450" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="rgba(255,255,255,0.8)">${SUBTITLE}</text>` : ''}
  
  <!-- Date -->
  ${DATE ? `<text x="540" y="520" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(233,69,96,1)">${DATE}</text>` : ''}
  
  <!-- CTA Button -->
  ${CTA ? `
  <rect x="290" y="600" width="500" height="80" fill="url(#accentGrad)" rx="40"/>
  <text x="540" y="650" font-family="Arial, sans-serif" font-size="28" font-weight="600" text-anchor="middle" fill="white">${CTA}</text>
  ` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 