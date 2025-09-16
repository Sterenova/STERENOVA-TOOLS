import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EventHeroStoryTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '01_story_event_hero.svg',
    displayName: 'Story Hero Événementiel',
    description: 'Template de story hero moderne pour événementiel avec design premium',
    category: 'story',
    tags: ['hero', 'event', 'premium', 'modern', 'story'],
    dimensions: { width: 1080, height: 1920 },
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
        key: 'PHOTO_LABEL',
        description: 'Label pour la photo principale',
        example: 'Photo plein écran',
        required: false,
        defaultValue: 'Photo plein écran',
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
    const { TITLE, SUBTITLE, DATE, PHOTO_LABEL, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="eventStoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentStoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e94560;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff6b6b;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#eventStoryGrad)"/>
  
  <!-- Decorative elements -->
  <circle cx="200" cy="300" r="200" fill="rgba(233,69,96,0.1)"/>
  <circle cx="880" cy="1600" r="150" fill="rgba(255,107,107,0.1)"/>
  
  <!-- Photo placeholder -->
  <rect x="40" y="800" width="1000" height="800" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="20"/>
  <text x="540" y="1200" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.8)">${PHOTO_LABEL}</text>
  
  <!-- Content -->
  <text x="540" y="400" font-family="Arial, sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="white">${TITLE}</text>
  ${SUBTITLE ? `<text x="540" y="500" font-family="Arial, sans-serif" font-size="44" text-anchor="middle" fill="rgba(255,255,255,0.9)">${SUBTITLE}</text>` : ''}
  
  <!-- Date -->
  ${DATE ? `<text x="540" y="600" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="rgba(233,69,96,1)">${DATE}</text>` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="1700" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 