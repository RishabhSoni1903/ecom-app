import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/auth/user.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'order'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'The total price of order (price*quantity)',
        example: 'INR 5000'
    })
    @Column()
    subTotal: number

    @ApiProperty({
        description: 'Shows the status of order',
        example: 'false'
    })
    @Column({ default: false })
    pending: boolean

    @OneToMany(()=> Product, item => item.id)
    items: Product[]

    @OneToOne(()=> Users, user => user.username)
    user: Users
}