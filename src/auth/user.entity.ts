import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/cart/cart.entity";
import { Order } from "src/order/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'The email of user',
        example: 'johndoe@email.com'
    })
    @Column({
        unique: true
    })
    email: string

    @ApiProperty({
        description: 'The username of user',
        example: 'John Doe'
    })
    @Column()
    username: string
    
    @ApiProperty({
        description: 'The password of user',
        example: 'can_be-any-thing'
    })
    @Column()
    password: string

    @Column()
    role: string

    @CreateDateColumn()
    createdAt: String

    @UpdateDateColumn()
    updatedAt: String

    @OneToMany(() => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart[]

    @OneToOne(() => Order, order => order.id)
    @JoinColumn()
    order: Order
}