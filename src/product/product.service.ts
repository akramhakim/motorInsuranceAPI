import { Injectable, NotFoundException, ConflictException  } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dtos/create-product.dto";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

    async findByProductCode(productCode: string) {
        return await this.repo.findOneBy({ productCode });
    }

    async findByProductCodeAndLocation(productCode: string, location: string) {
        return await this.repo.findOneBy({ productCode, location });
    }

    async create(createProductDto: CreateProductDto) {
        const existedProductCode = await this.findByProductCode(createProductDto.productCode);
        if (existedProductCode) {
            throw new ConflictException('Product with the following productCode ' + createProductDto.productCode + ' already exists');
        }

        const product = this.repo.create(createProductDto);
        return this.repo.save(product);
    }

    async update(productCode: string, attrs: Partial<Product>) {        
        const product = await this.findByProductCode(productCode);
        if (!product) {
            throw new NotFoundException('Product not found!');
        }
    
        Object.assign(product, attrs);
        return this.repo.save(product);
    }

    async remove(productCode: string) {
        const product = await this.findByProductCode(productCode);
        if (!product) {
            throw new NotFoundException('Product not found!');
        }

        return this.repo.remove(product);
    }
}