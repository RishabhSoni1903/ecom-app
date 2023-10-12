import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "./cart.entity";
import { Repository } from "typeorm";
import { Users } from "src/auth/user.entity";
import { ProductService } from "src/product/product.service";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Users) private userRepository: Repository<Users>,
        private productService: ProductService,
    ){}

    async addToCart(itemId: number, quantity: number, username: string): Promise<any> {
        const cartItems = await this.cartRepository.find({relations: ['item', 'user']});
        // console.log(cartItems)
        const product = await this.productService.findOne(itemId);
        const authUser = await this.userRepository.findOne({where: {username}})

        //Confirm if product exists
        if(product) {
            //Check if user already has that item in the cart
            const cart = cartItems.filter((item)=> { 
                return item.item.id === itemId && item.user.username === username
            })
            if(cart.length < 1) {
                const newItem = this.cartRepository.create({ total: product.price * quantity, quantity })
                newItem.user = authUser;
                newItem.item = product;

                return this.cartRepository.save(newItem);
            } else {
                // Update the item quantity
                console.log('Update cart called')
                const quantity = cart[0].quantity =+ 1;
                const total = cart[0].total * quantity;

                return await this.cartRepository.update(cart[0].id, {quantity, total})
            }
        } return null;
    }

    async getItemsInCart(username: string): Promise<Cart[]> {
        const userCart = await this.cartRepository.find({relations: ['item', 'user']});
        return (await userCart).filter((item) => item.user.username === username) 
    }

    async remove(id: number, user: Users) {
        if(user){
        return await this.cartRepository.delete(id);
        }
    }
}