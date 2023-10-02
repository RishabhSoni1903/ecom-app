import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/cart/cart.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The name of product',
        example: 'John Doe'
    })
    @Column()
    name: string;
    
    @ApiProperty({
        description: 'The brand of product',
        example: 'Adidas'
    })
    @Column()
    brand: string;

    @ApiProperty({
        description: 'The description of product',
        example: 'John Doe'
    })
    @Column()
    description: string;

    @ApiProperty({
        description: 'The category of product',
        example: 'Clothing'
    })
    @Column()
    category: string;

    @ApiProperty({
        description: 'The price of product',
        example: 'INR 4000'
    })
    @Column()
    price: number;

    @OneToMany(() => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]
}
