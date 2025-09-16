import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EventTestimonialPostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '08_post_event_testimonial.svg',
    displayName: 'Post Témoignage Client',
    description: 'Template de post pour afficher un témoignage client',
    category: 'post',
    tags: ['testimonial', 'client', 'review', 'social-proof'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'CLIENT_NAME',
        description: 'Nom du client',
        example: 'Marie & Pierre',
        required: true,
        defaultValue: 'Marie & Pierre',
      },
      {
        key: 'EVENT_TYPE',
        description: 'Type d\'événement',
        example: 'Mariage Château',
        required: false,
        defaultValue: 'Mariage Château',
      },
      {
        key: 'TESTIMONIAL',
        description: 'Témoignage',
        example: 'Service exceptionnel, tout était parfait !',
        required: false,
        defaultValue: 'Service exceptionnel, tout était parfait !',
      },
      {
        key: 'RATING',
        description: 'Note',
        example: '⭐⭐⭐⭐⭐',
        required: false,
        defaultValue: '⭐⭐⭐⭐⭐',
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
    const { CLIENT_NAME, EVENT_TYPE, TESTIMONIAL, RATING, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="testimonialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9b59b6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8e44ad;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#testimonialGrad)"/>
  
  <!-- Quote icon -->
  <text x="540" y="200" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" fill="rgba(255,255,255,0.3)">"</text>
  
  <!-- Testimonial text -->
  ${TESTIMONIAL ? `<text x="540" y="350" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="white" style="max-width: 900px;">${TESTIMONIAL}</text>` : ''}
  
  <!-- Client info -->
  <text x="540" y="500" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">${CLIENT_NAME}</text>
  ${EVENT_TYPE ? `<text x="540" y="560" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="rgba(255,255,255,0.8)">${EVENT_TYPE}</text>` : ''}
  
  <!-- Rating -->
  ${RATING ? `<text x="540" y="650" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="rgba(243,156,18,1)">${RATING}</text>` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 