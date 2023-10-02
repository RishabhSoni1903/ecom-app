import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cart } from './cart.entity';

@Controller('cart')
export class CartController {
    constructor( private cartService: CartService ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addToCart(@Body() body, @Request() req): Promise<void> {
        const { productId, quantity } = body;
        return await this.cartService.addToCart(productId, quantity, req.user.username)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getItemsInCart(@Request() req): Promise<Cart[]> {
        return await this.cartService.getItemsInCart(req.user.username);
    }
}
