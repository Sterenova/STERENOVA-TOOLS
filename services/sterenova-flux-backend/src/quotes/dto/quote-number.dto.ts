import { ApiProperty } from '@nestjs/swagger';

export class QuoteNumberDto {
  @ApiProperty({ 
    description: 'Numéro de devis généré',
    example: 'DEV-202509-001'
  })
  quoteNumber: string;
}
