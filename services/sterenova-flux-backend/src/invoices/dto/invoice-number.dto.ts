import { ApiProperty } from '@nestjs/swagger';

export class InvoiceNumberDto {
  @ApiProperty({ 
    description: 'Numéro de facture généré',
    example: 'FAC-202509-001'
  })
  invoiceNumber: string;
}
