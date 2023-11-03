
import { Users } from "src/auth/user.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({name: 'orderItem'})
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    // @OneToOne(()=> Product, item => item.id)
    // @JoinColumn()
    // items: Product[];

    // @ManyToOne(()=> Order, order => order.id)
    // @JoinColumn()
    // order: Order
}