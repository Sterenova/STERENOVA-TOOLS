import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class GenerateSvgDto {
	@ApiProperty({ enum: ['post', 'story'] })
	@IsEnum(['post', 'story'])
	kind: 'post' | 'story';

	@ApiProperty({ description: 'Nom du fichier modèle (par ex. 03_post_promo_pack.svg)' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiPropertyOptional({ description: 'Map de remplacements placeholders -> valeurs' })
	@IsOptional()
	@IsObject()
	replacements?: Record<string, string>;
}

export class GeneratePlaceholdersDto {
	@ApiProperty({ description: 'SVG source contenant des placeholders {{PLACEHOLDER}}' })
	@IsString()
	@IsNotEmpty()
	sourceSvg: string;

	@ApiProperty({ description: 'Map de valeurs pour remplacer les placeholders', example: { TITLE: 'Mon Titre' } })
	@IsObject()
	values: Record<string, string>;
} 