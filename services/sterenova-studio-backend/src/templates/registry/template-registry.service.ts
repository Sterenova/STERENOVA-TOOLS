import { Injectable, OnModuleInit } from '@nestjs/common';
import { Template, TemplateRegistry } from '../interfaces/template.interface';

@Injectable()
export class TemplateRegistryService implements OnModuleInit {
  private registry: TemplateRegistry = {};

  onModuleInit() {
    console.log('TemplateRegistryService: onModuleInit called');
    this.registerModularTemplates();
  }

  private registerModularTemplates() {
    console.log('TemplateRegistryService: Starting template registration...');
    
    try {
      // Import manuel de tous les templates de posts
      console.log('TemplateRegistryService: Importing post templates...');
      const { EventHeroPostTemplate } = require('../modular/posts/event-hero-post.template');
      const { EquipmentShowcasePostTemplate } = require('../modular/posts/equipment-showcase-post.template');
      const { EventPackagePostTemplate } = require('../modular/posts/event-package-post.template');
      const { EventGalleryPostTemplate } = require('../modular/posts/event-gallery-post.template');
      const { EquipmentCatalogPostTemplate } = require('../modular/posts/equipment-catalog-post.template');
      const { EventCountdownPostTemplate } = require('../modular/posts/event-countdown-post.template');
      const { EquipmentSpecsPostTemplate } = require('../modular/posts/equipment-specs-post.template');
      const { EventTestimonialPostTemplate } = require('../modular/posts/event-testimonial-post.template');
      
      // Import manuel de tous les templates de stories
      console.log('TemplateRegistryService: Importing story templates...');
      const { EventHeroStoryTemplate } = require('../modular/stories/event-hero-story.template');
      const { EquipmentShowcaseStoryTemplate } = require('../modular/stories/equipment-showcase-story.template');
      const { EventPackageStoryTemplate } = require('../modular/stories/event-package-story.template');
      const { EventGalleryStoryTemplate } = require('../modular/stories/event-gallery-story.template');
      const { EquipmentCatalogStoryTemplate } = require('../modular/stories/equipment-catalog-story.template');
      
      console.log('TemplateRegistryService: All imports successful');
      
      // Enregistrer tous les templates de posts
      const postTemplates = [
        new EventHeroPostTemplate(),
        new EquipmentShowcasePostTemplate(),
        new EventPackagePostTemplate(),
        new EventGalleryPostTemplate(),
        new EquipmentCatalogPostTemplate(),
        new EventCountdownPostTemplate(),
        new EquipmentSpecsPostTemplate(),
        new EventTestimonialPostTemplate(),
      ];
      
      // Enregistrer tous les templates de stories
      const storyTemplates = [
        new EventHeroStoryTemplate(),
        new EquipmentShowcaseStoryTemplate(),
        new EventPackageStoryTemplate(),
        new EventGalleryStoryTemplate(),
        new EquipmentCatalogStoryTemplate(),
      ];
      
      // Enregistrer tous les templates
      [...postTemplates, ...storyTemplates].forEach(template => {
        const key = `${template.metadata.category}/${template.metadata.name}`;
        this.registry[key] = template;
        console.log(`TemplateRegistryService: Registered ${key}`);
      });
      
      console.log(`TemplateRegistryService: Total templates registered: ${Object.keys(this.registry).length}`);
      
    } catch (error) {
      console.error('TemplateRegistryService: Error during template registration:', error);
    }
  }

  // Public methods
  getAllTemplates(): TemplateRegistry {
    return { ...this.registry };
  }

  getTemplate(key: string): Template | undefined {
    return this.registry[key];
  }

  getTemplatesByCategory(category: 'post' | 'story'): Template[] {
    return Object.values(this.registry).filter(t => t.metadata.category === category);
  }

  getTemplateMetadata(key: string) {
    const template = this.registry[key];
    return template ? template.metadata : null;
  }

  getAllMetadata() {
    console.log('TemplateRegistryService: getAllMetadata called, registry keys:', Object.keys(this.registry));
    return Object.entries(this.registry).map(([key, template]) => ({
      key,
      ...template.metadata,
    }));
  }

  // For future template registration
  registerTemplate(key: string, template: Template) {
    this.registry[key] = template;
  }

  // Get all available placeholders for a template
  getTemplatePlaceholders(key: string) {
    const template = this.registry[key];
    return template ? template.metadata.placeholders : [];
  }

  // Search templates by tags
  searchTemplatesByTags(tags: string[]) {
    const allTemplates = Object.values(this.registry);
    return allTemplates.filter(template => 
      tags.some(tag => template.metadata.tags.includes(tag))
    );
  }
} 