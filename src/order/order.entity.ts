import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'order'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: String

    @ApiProperty({
        description: 'The total price of order (price*quantity)',
        example: 'INR 5000'
    })
    @Column()
    subTotal: number

    @ApiProperty({
        description: 'Description of the items in order'
    })
    @Column()
    items: string

    @ApiProperty({
        description: 'Shows the status of order',
        example: 'false'
    })
    @Column({ default: false })
    pending: boolean

    @ManyToOne(() => Users, user => user.username)
    user: Users
}