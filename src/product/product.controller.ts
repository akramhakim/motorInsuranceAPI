import { Controller, Get, Post, Put, Delete, Query, Body, NotFoundException, UseGuards  } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { Roles } from 'src/guard/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
    constructor(public productService: ProductService) {}

    @Get()
    @ApiQuery({ name: 'productCode', required: true, type: String, description: 'Unique code of a product. E.g. 1000' })
    @ApiQuery({ name: 'location', required: true, type: String, description: 'Product coverage location. E.g. West Malaysia' })
    @ApiResponse({ status: 200, description: 'The specific product filtered by productCode and location' })
    @ApiResponse({ status: 404, description: 'The specific product filtered by productCode and location not found' })
    async findProduct(@Query('productCode') productCode: string, @Query('location') location: string) {    
        const product = await this.productService.findByProductCodeAndLocation(productCode, location);
        if (!product) throw new NotFoundException('Product not found!');

        return product;
    }

    @Post()
    @Roles('admin')
    @ApiBearerAuth('JWT-auth') 
    @ApiBody({
        description: 'To allow admin create new product',
        required: true,
        type: CreateProductDto,
        examples: {
          example1: {
            summary: 'Create new product for MPV',
            value: { productCode: '3000', productDescription: 'MPV', location: 'West Malaysia', price: 700 },
          },
        },
    })
    @ApiResponse({ status: 201, description: 'Product created successfully, the response return the newly create product' })
    @ApiResponse({ status: 401, description: 'Unauthorized access to the API' })
    @ApiResponse({ status: 409, description: 'Product code already exists' })
    @ApiOperation({ summary: 'Protected endpoint', description: 'Use given jwtoken to get authorize to this endpoint'})
    createProduct(@Body() body: CreateProductDto) {
        return this.productService.create(body);
    }

    @Put()
    @Roles('admin')
    @ApiBearerAuth('JWT-auth')
    @ApiQuery({ name: 'productCode', required: true, type: String, description: 'Unique code of a product' })
    @ApiBody({
        description: 'To allow admin update product details',
        required: true,
        type: UpdateProductDto,
        examples: {
          example1: {
            summary: 'Update product details of productCode 1000',
            value: { productDescription: 'Sedan', location: 'West Malaysia', price: 400 },
          },
        },
    })
    @ApiResponse({ status: 200, description: 'Product updated successfully, the response return the updated product details' })
    @ApiResponse({ status: 401, description: 'Unauthorized access to the API' })
    @ApiResponse({ status: 404, description: 'The specific product filtered by productCode not found' })
    @ApiOperation({ summary: 'Protected endpoint', description: 'Use given jwtoken to get authorize to this endpoint'})
    updateProduct(@Query('productCode') productCode: string, @Body() body: UpdateProductDto) {       
        return this.productService.update(productCode, body);
    }

    @Delete()
    @Roles('admin')
    @ApiBearerAuth('JWT-auth')
    @ApiQuery({ name: 'productCode', required: true, type: String, description: 'Unique code of a product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully, the response return the deleted product details' })
    @ApiResponse({ status: 401, description: 'Unauthorized access to the API' })
    @ApiResponse({ status: 404, description: 'The specific product filtered by productCode not found' })
    @ApiOperation({ summary: 'Protected endpoint', description: 'Use given jwtoken to get authorize to this endpoint'})
    removeProduct(@Query('productCode') productCode: string) {
        return this.productService.remove(productCode);
    }
}
