export interface TemplatePlaceholder {
  key: string;
  description: string;
  example: string;
  required: boolean;
  defaultValue?: string;
}

export interface TemplateMetadata {
  name: string;
  displayName: string;
  description: string;
  category: 'post' | 'story';
  tags: string[];
  dimensions: {
    width: number;
    height: number;
  };
  placeholders: TemplatePlaceholder[];
}

export interface Template {
  metadata: TemplateMetadata;
  generate: (data: Record<string, string>) => string;
  getPreset: () => Record<string, string>;
}

export interface TemplateRegistry {
  [key: string]: Template;
}
