import { BaseTemplate } from '../../base/base-template';
import { TemplateMetadata } from '../../interfaces/template.interface';

export class EventGalleryPostTemplate extends BaseTemplate {
  readonly metadata: TemplateMetadata = {
    name: '04_post_event_gallery.svg',
    displayName: 'Post Galerie Événements',
    description: 'Template de post pour présenter une galerie d\'événements avec design moderne',
    category: 'post',
    tags: ['gallery', 'event', 'showcase', 'modern'],
    dimensions: { width: 1080, height: 1080 },
    placeholders: [
      {
        key: 'GALLERY_TITLE',
        description: 'Titre de la galerie',
        example: 'NOS DERNIERS ÉVÉNEMENTS',
        required: true,
        defaultValue: 'NOS DERNIERS ÉVÉNEMENTS',
      },
      {
        key: 'EVENT_1',
        description: 'Premier événement',
        example: 'Mariage Château • 200 personnes',
        required: false,
        defaultValue: 'Mariage Château • 200 personnes',
      },
      {
        key: 'EVENT_2',
        description: 'Deuxième événement',
        example: 'Corporate Tech • 500 personnes',
        required: false,
        defaultValue: 'Corporate Tech • 500 personnes',
      },
      {
        key: 'EVENT_3',
        description: 'Troisième événement',
        example: 'Festival Summer • 1000 personnes',
        required: false,
        defaultValue: 'Festival Summer • 1000 personnes',
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
    const { GALLERY_TITLE, EVENT_1, EVENT_2, EVENT_3, HANDLE } = data;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="galleryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16a085;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1abc9c;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0.05);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#galleryGrad)"/>
  
  <!-- Title -->
  <text x="540" y="120" font-family="Arial, sans-serif" font-size="64" font-weight="bold" text-anchor="middle" fill="white">${GALLERY_TITLE}</text>
  
  <!-- Event cards -->
  ${EVENT_1 ? `
  <rect x="90" y="200" width="400" height="200" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="15"/>
  <text x="290" y="280" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="white">${EVENT_1}</text>
  <rect x="120" y="300" width="340" height="80" fill="rgba(255,255,255,0.1)" rx="10"/>
  <text x="290" y="350" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)">Photo événement</text>
  ` : ''}
  
  ${EVENT_2 ? `
  <rect x="590" y="200" width="400" height="200" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="15"/>
  <text x="790" y="280" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="white">${EVENT_2}</text>
  <rect x="620" y="300" width="340" height="80" fill="rgba(255,255,255,0.1)" rx="10"/>
  <text x="790" y="350" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)">Photo événement</text>
  ` : ''}
  
  ${EVENT_3 ? `
  <rect x="340" y="450" width="400" height="200" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="2" rx="15"/>
  <text x="540" y="530" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="white">${EVENT_3}</text>
  <rect x="370" y="550" width="340" height="80" fill="rgba(255,255,255,0.1)" rx="10"/>
  <text x="540" y="600" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)">Photo événement</text>
  ` : ''}
  
  <!-- Handle -->
  ${HANDLE ? `<text x="540" y="950" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.6)">${HANDLE}</text>` : ''}
</svg>`;
  }
} 