import { IsNumber, IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'The description of a product, optional input', example: 'Sedan, SUV' })
    productDescription: string;

    @IsString()
    @ApiPropertyOptional({ description: 'The coverage location', example: 'West Malaysia, East Malaysia' })
    location: string;

    @IsNumber()
    @ApiPropertyOptional({ description: 'The price of the product', example: 'RM 300' })
    price: number;
}