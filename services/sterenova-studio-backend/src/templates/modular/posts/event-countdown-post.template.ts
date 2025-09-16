import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EventCountdownPostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '06_post_event_countdown.svg',
    displayName: 'Post Compte à Rebours Événement',
    description: 'Template de post avec compte à rebours pour événement',
    category: 'post',
    tags: ['countdown', 'event', 'urgent', 'modern'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'EVENT_NAME',
        description: 'Nom de l\'événement',
        example: 'SOIRÉE PRIVÉE',
        required: true,
        defaultValue: 'SOIRÉE PRIVÉE',
      },
      {
        key: 'DAYS_LEFT',
        description: 'Jours restants',
        example: '15 JOURS',
        required: false,
        defaultValue: '15 JOURS',
      },
      {
        key: 'DEADLINE',
        description: 'Date limite',
        example: 'Réservation avant le 30 Nov',
        required: false,
        defaultValue: 'Réservation avant le 30 Nov',
      },
      {
        key: 'CTA',
        description: 'Call to action',
        example: 'RÉSERVEZ MAINTENANT',
        required: false,
        defaultValue: 'RÉSERVEZ MAINTENANT',
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
    const { EVENT_NAME, DAYS_LEFT, DEADLINE, CTA, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="countdownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e74c3c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c0392b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f39c12;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e67e22;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#countdownGrad)"/>
  
  <!-- Timer circle -->
  <circle cx="540" cy="300" r="120" fill="rgba(243,156,18,0.2)" stroke="rgba(243,156,18,0.8)" stroke-width="6"/>
  <text x="540" y="320" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="rgba(243,156,18,1)">⏰</text>
  
  <!-- Event name -->
  <text x="540" y="500" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">${EVENT_NAME}</text>
  
  <!-- Days left -->
  ${DAYS_LEFT ? `<text x="540" y="580" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="rgba(243,156,18,1)">${DAYS_LEFT}</text>` : ''}
  
  <!-- Deadline -->
  ${DEADLINE ? `<text x="540" y="650" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="rgba(255,255,255,0.9)">${DEADLINE}</text>` : ''}
  
  <!-- CTA Button -->
  ${CTA ? `
  <rect x="240" y="750" width="600" height="100" fill="url(#timerGrad)" rx="50"/>
  <text x="540" y="810" font-family="Arial, sans-serif" font-size="32" font-weight="600" text-anchor="middle" fill="white">${CTA}</text>
  ` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 