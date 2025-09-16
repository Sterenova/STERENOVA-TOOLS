import { Template, TemplateMetadata, TemplatePlaceholder } from '../interfaces/template.interface';

export abstract class BaseTemplate implements Template {
  abstract readonly metadata: TemplateMetadata;

  generate(data: Record<string, string>): string {
    // Apply default values for missing placeholders
    const completeData = this.applyDefaults(data);
    
    // Validate required placeholders
    this.validateRequiredPlaceholders(completeData);
    
    // Generate the SVG with the complete data
    return this.generateSvg(completeData);
  }

  getPreset(): Record<string, string> {
    const preset: Record<string, string> = {};
    
    for (const placeholder of this.metadata.placeholders) {
      if (placeholder.defaultValue) {
        preset[placeholder.key] = placeholder.defaultValue;
      } else {
        preset[placeholder.key] = placeholder.example;
      }
    }
    
    return preset;
  }

  protected abstract generateSvg(data: Record<string, string>): string;

  private applyDefaults(data: Record<string, string>): Record<string, string> {
    const completeData = { ...data };
    
    for (const placeholder of this.metadata.placeholders) {
      if (placeholder.defaultValue && !(placeholder.key in completeData)) {
        completeData[placeholder.key] = placeholder.defaultValue;
      }
    }
    
    return completeData;
  }

  private validateRequiredPlaceholders(data: Record<string, string>): void {
    const missing = this.metadata.placeholders
      .filter(p => p.required && !(p.key in data))
      .map(p => p.key);
    
    if (missing.length > 0) {
      throw new Error(`Missing required placeholders: ${missing.join(', ')}`);
    }
  }

  protected replacePlaceholders(svg: string, data: Record<string, string>): string {
    let result = svg;
    
    for (const [key, value] of Object.entries(data)) {
      const pattern = new RegExp(this.escapeRegExp(`{{${key}}}`), 'g');
      result = result.replace(pattern, String(value));
    }
    
    return result;
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
} 