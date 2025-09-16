-- Migration: Create user-related tables for templates system
-- Date: 2024-01-XX
-- Description: Creates tables for download history, favorite templates, and SVG settings

-- Create download_history table
CREATE TABLE IF NOT EXISTS download_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "templateName" VARCHAR(255) NOT NULL,
    "templateCategory" VARCHAR(100) NOT NULL CHECK ("templateCategory" IN ('post', 'story')),
    "templateParameters" JSONB,
    "fileName" VARCHAR(255),
    "fileFormat" VARCHAR(50) DEFAULT 'svg',
    "fileSize" INTEGER,
    "ipAddress" VARCHAR(255),
    "userAgent" VARCHAR(255),
    "userId" UUID,
    "downloadedAt" TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_download_history_user
        FOREIGN KEY ("userId") REFERENCES users(id)
        ON DELETE SET NULL
);

-- Create indexes for download_history
CREATE INDEX IF NOT EXISTS idx_download_history_user_id ON download_history("userId");
CREATE INDEX IF NOT EXISTS idx_download_history_template_name ON download_history("templateName");
CREATE INDEX IF NOT EXISTS idx_download_history_downloaded_at ON download_history("downloadedAt");
CREATE INDEX IF NOT EXISTS idx_download_history_category ON download_history("templateCategory");

-- Create favorite_templates table
CREATE TABLE IF NOT EXISTS favorite_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "templateName" VARCHAR(255) NOT NULL,
    "templateCategory" VARCHAR(100) NOT NULL CHECK ("templateCategory" IN ('post', 'story')),
    "defaultParameters" JSONB,
    notes TEXT,
    "usageCount" INTEGER DEFAULT 0,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_favorite_templates_user
        FOREIGN KEY ("userId") REFERENCES users(id)
        ON DELETE CASCADE,
    
    CONSTRAINT uk_favorite_templates_user_template
        UNIQUE ("userId", "templateName")
);

-- Create indexes for favorite_templates
CREATE INDEX IF NOT EXISTS idx_favorite_templates_user_id ON favorite_templates("userId");
CREATE INDEX IF NOT EXISTS idx_cavorite_templates_category ON favorite_templates("templateCategory");
CREATE INDEX IF NOT EXISTS idx_favorite_templates_usage_count ON favorite_templates("usageCount");

-- Create svg_settings table
CREATE TABLE IF NOT EXISTS svg_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "settingKey" VARCHAR(100) NOT NULL,
    "settingName" VARCHAR(255) NOT NULL,
    description TEXT,
    value JSONB NOT NULL,
    "valueType" VARCHAR(50) DEFAULT 'string' CHECK ("valueType" IN ('string', 'number', 'boolean', 'object', 'array')),
    "isGlobal" BOOLEAN DEFAULT FALSE,
    category VARCHAR(100),
    priority INTEGER DEFAULT 0,
    "userId" UUID,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_svg_settings_user
        FOREIGN KEY ("userId") REFERENCES users(id)
        ON DELETE CASCADE,
    
    CONSTRAINT uk_svg_settings_key_user
        UNIQUE ("settingKey", "userId")
);

-- Create indexes for svg_settings
CREATE INDEX IF NOT EXISTS idx_svg_settings_user_id ON svg_settings("userId");
CREATE INDEX IF NOT EXISTS idx_svg_settings_key ON svg_settings("settingKey");
CREATE INDEX IF NOT EXISTS idx_svg_settings_global ON svg_settings("isGlobal");
CREATE INDEX IF NOT EXISTS idx_svg_settings_category ON svg_settings(category);
CREATE INDEX IF NOT EXISTS idx_svg_settings_priority ON svg_settings(priority);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables that need updated_at
CREATE TRIGGER update_favorite_templates_updated_at
    BEFORE UPDATE ON favorite_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_svg_settings_updated_at
    BEFORE UPDATE ON svg_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some global default SVG settings
INSERT INTO svg_settings ("settingKey", "settingName", description, value, "valueType", "isGlobal", category, priority)
VALUES 
    ('defaultWidth', 'Largeur par défaut', 'Largeur par défaut des SVG générés', 1080, 'number', true, 'dimensions', 1),
    ('defaultHeight', 'Hauteur par défaut', 'Hauteur par défaut des SVG générés', 1080, 'number', true, 'dimensions', 2),
    ('defaultFontFamily', 'Police par défaut', 'Famille de police par défaut', 'Arial, sans-serif', 'string', true, 'typography', 3),
    ('defaultFontSize', 'Taille de police par défaut', 'Taille de police par défaut en pixels', 16, 'number', true, 'typography', 4),
    ('defaultBackgroundColor', 'Couleur de fond par défaut', 'Couleur de fond par défaut des SVG', '#FFFFFF', 'string', true, 'colors', 5),
    ('defaultTextColor', 'Couleur de texte par défaut', 'Couleur de texte par défaut des SVG', '#000000', 'string', true, 'colors', 6)
ON CONFLICT ("settingKey", "userId") DO NOTHING; 