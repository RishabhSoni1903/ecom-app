import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/user.entity';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private cartService: CartService
    ) {}

    async placeOrder(user: string): Promise<any> {

        // Find user's cart item
        const cartItems = await this.cartService.getItemsInCart(user);
        console.log('Cart items', cartItems)
        
        // Get authenticated user
        const authUser = await this.userRepository.findOne({where: {username: user}});
        
        if(cartItems.length > 0) {
            const subTotal = cartItems.map(item => item.total).reduce((acc, next) => acc+next);
            const itemsStr = JSON.stringify(cartItems)
            console.log('cart', itemsStr)
                const newOrder = this.orderRepository.create({
                items: itemsStr,
                subTotal: subTotal,
                user: authUser
            });
            console.log('new Order', newOrder)
            const order = await this.orderRepository.save(newOrder);
            return newOrder;
        }
        else {
            throw new BadRequestException({
                message: 'Cart cannot be empty',
                statusCode: 400,
            });
        }
    }

    async getOrders(user: string): Promise<Order[]> {
        const orders = await this.orderRepository.find({relations: ['user']})
        return orders.filter(order => order.user?.username === user)
    }
}
