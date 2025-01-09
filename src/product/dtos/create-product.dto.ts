import { IsNumber, IsString } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @IsString()
    @ApiPropertyOptional({ description: 'Unique product code', example: '1001' })
    productCode: string;

    @IsString()
    @ApiPropertyOptional({ description: 'The description of a product', example: 'Sedan, SUV' })
    productDescription: string;

    @IsString()
    @ApiPropertyOptional({ description: 'The coverage location', example: 'West Malaysia, East Malaysia' })
    location: string;

    @IsNumber()
    @ApiPropertyOptional({ description: 'The price of the product', example: 'RM 300' })
    price: number;
}