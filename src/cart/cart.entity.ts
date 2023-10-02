import { Users } from "src/auth/user.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cart'})
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    total: number

    @Column()
    quantity: number

    @ManyToOne(() => Product, order => order.id)
    @JoinColumn()
    item: Product

    @ManyToOne(() => Users, user => user.username)
    user: Users
}