import { Body, Controller, Get, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';

@Controller('order')
export class OrderController {
    constructor( private orderService: OrderService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async placeOrder(@Request() req): Promise<any> {
        return this.orderService.placeOrder(req.user.username)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrders(@Request() req): Promise<Order[]> {
        return await this.orderService.getOrders(req.user.username)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/buynow')
    async buyNow(@Request() req, @Body("productId") productId: number): Promise<any>{
        console.log("user", req.user.username)
        console.log("productId", productId)
        return await this.orderService.buyNow( req.user.username, productId )
    }
}
