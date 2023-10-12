import { Injectable } from '@nestjs/common';
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

        // Find existing orders for that user
        const usersOrder = await this.orderRepository.find({relations: ['user']})
        const userOrder = usersOrder.filter(order => order.user?.username === user && order.pending == false);

        // Find user's cart item
        const cartItems = await this.cartService.getItemsInCart(user);
        const subTotal = cartItems.map(item => item.total).reduce((acc, next) => acc+next);
        
        // Get authenticated user
        const authUser = await this.userRepository.findOne({where: {username: user}});

        // If user has pending orders, add them to the list of order
        const cart = await cartItems.map(item => item.item)

        console.log('mai yha tu wha', userOrder)
        if(userOrder.length === 0) {
            console.log('koi hai yja kya gand mrane ko')
            const newOrder = await this.orderRepository.create({subTotal});
            console.log('new order', newOrder)
            newOrder.items = cart;
            newOrder.user = authUser;
            //const order = await this.orderRepository.save(newOrder);
            console.log('kya mai yha pahicha')
            return newOrder
        } else {
            const existingOrder = userOrder.map(item => item)
            await this.orderRepository.update(existingOrder[0].id, { subTotal: existingOrder[0].subTotal + cart[0].price})
            return {message: 'Order modified'}
        }
    }

    async getOrders(user: string): Promise<Order[]> {
        const orders = await this.orderRepository.find({relations: ['user']})
        return orders.filter(order => order.user?.username === user)
    }
}
