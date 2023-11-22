import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/user.entity';
import { CartService } from 'src/cart/cart.service';
import { Product } from 'src/product/product.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private cartService: CartService
    ) {}

    async placeOrder(user: string): Promise<any> {

        // Find user's cart item
        const cartItems = await this.cartService.getItemsInCart(user);
        console.log('Cart items', cartItems)
        const newCartItems = cartItems.filter((i) => i.item !== null)
        
        // Get authenticated user
        const authUser = await this.userRepository.findOne({where: {username: user}});
        
        if(newCartItems.length > 0) {
            const subTotal = newCartItems.map(item => item.total).reduce((acc, next) => acc+next);
            const itemsStr = JSON.stringify(newCartItems)
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

    async buyNow(user: string, productId: number ) {
        const authUser = await this.userRepository.findOne({where: {username: user}});
        const product = await this.productRepository.findOne({where: {id: productId}});
        const productStr = JSON.stringify(product)
        if(authUser){
            const newOrder = this.orderRepository.create({
                items: productStr,
                subTotal: product.price,
                user: authUser
            })
            console.log("newOrder", newOrder)
            return this.orderRepository.save(newOrder);
        }else{
            throw new BadRequestException({
                message: 'Order cannot be placed',
                statusCode: 400,
            })
        }
    }

    async getOrders(user: string): Promise<Order[]> {
        const orders = await this.orderRepository.find({relations: ['user']})
        return orders.filter(order => order.user?.username === user)
    }
}
