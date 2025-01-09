import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeRemove, AfterUpdate } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    productCode: string;

    @Column()
    productDescription: string;

    @Column()
    location: string;

    @Column()
    price: number;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Product with id', this.productId);   
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Product with id', this.productId);
    }

    @BeforeRemove()
    logRemove() {
        console.log('Removed Product with id', this.productId);
    }
}